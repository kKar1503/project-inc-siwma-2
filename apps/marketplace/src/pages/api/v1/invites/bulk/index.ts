import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import client from '@inc/db';
import { validateEmail, validateName } from '@/utils/api/validate';
import {
  NotFoundError,
  DuplicateError,
  EmailTemplateNotFoundError,
  EmailSendError,
  UnknownError,
} from '@inc/errors';
import {
  getContentFor,
  BulkInviteEmailRequestBody,
  EmailTemplate,
} from '@inc/send-in-blue/templates';
import sendEmails from '@inc/send-in-blue/sendEmails';

const bulkInviteSchema = z.array(
  z.object({
    mobileNumber: z.string().optional(),
    name: z.string(),
    email: z.string(),
    company: z.string(),
  })
);

export default apiHandler({
  allowAdminsOnly: true,
}).post(async (req, res) => {
  // https://docs.google.com/document/d/1CtwAkM3uPCvJXwlQOZwavxbMG-sa8FkMa3r0ZbnHUlo/edit#heading=h.rq1g0ltfj4ji

  /* NOTE:
   * This endpoint returns an array called "errors".
   * This array contains the invites that failed to be created.
   * The array is empty if all invites were created successfully.
   * On the frontend, you may assume that all invites that aren't returned in the failed array were created successfully.
   */

  const parsedInvites = bulkInviteSchema.parse(req.body);

  const errors: Error[] = [];

  parsedInvites.forEach((invite) => {
    try {
      validateEmail(invite.email);
      validateName(invite.name);
    } catch (e) {
      // If an invite throws an error, remove it from the array and add the error to the errors array
      parsedInvites.splice(parsedInvites.indexOf(invite), 1);
      if (e instanceof Error) {
        errors.push(e);
      } else {
        errors.push(new UnknownError());
      }
    }
  });

  const existingUsers = await client.users.findMany({
    where: {
      OR: parsedInvites.map((invite) => ({
        email: invite.email,
        phone: invite.mobileNumber,
      })),
    },
  });

  const duplicateInvites = parsedInvites.filter((invite) =>
    existingUsers.find((user) => user.email === invite.email || user.phone === invite.mobileNumber)
  );

  // Filter out existing users and add them to the errors array
  duplicateInvites.forEach((invite) => {
    errors.push(
      new DuplicateError(`user with email ${invite.email} or phone ${invite.mobileNumber}`)
    );
  });

  // Find invites that have the same email or phone number as another invite
  parsedInvites.forEach((invite) => {
    const duplicate = parsedInvites.find(
      (otherInvite) =>
        otherInvite.email === invite.email || otherInvite.mobileNumber === invite.mobileNumber
    );

    if (duplicate && duplicate !== invite) {
      // If the duplicate invite is not the same invite, remove it from the array and add the error to the errors array
      parsedInvites.splice(parsedInvites.indexOf(duplicate), 1);
      errors.push(
        new DuplicateError(`invite with email ${invite.email} or phone ${invite.mobileNumber}`)
      );
    }
  });

  const newUsers = parsedInvites.filter(
    (invite) =>
      !existingUsers.find(
        (user) => user.email === invite.email || user.phone === invite.mobileNumber
      )
  );

  const successfullyCreatedInvites: { name: string; email: string; company: string }[] = [];

  const createInvites = async (invite: {
    email: string;
    name: string;
    company: string;
    mobileNumber?: string;
  }) => {
    const { email, name, company, mobileNumber } = invite;
    
    try {
      await client.$transaction(async (prisma) => {
        const companyObj = await prisma.companies.findFirst({
          where: {
            name: company,
          },
        });
    
        if (!companyObj) {
          throw new NotFoundError(`Company named ${company} not found`);
        }
    
        const tokenString = `${name}${email}${new Date().toISOString()}${Math.random()}`;
        const salt = await bcrypt.genSalt(10);
        const tokenHash = await bcrypt.hash(tokenString, salt);
    
        await prisma.invite.create({
          data: {
            email,
            name,
            companyId: companyObj.id,
            phone: mobileNumber,
            token: tokenHash,
            expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          },
        });
    
        successfullyCreatedInvites.push({
          name,
          email,
          company,
        });
      });
    } catch (e) {
      if (e instanceof Error) {
        errors.push(e);
      } else {
        errors.push(new UnknownError());
      }
    }
  };
  
  const invitePromises = newUsers.map((invite) => createInvites(invite));
  await Promise.all(invitePromises);
  

  // Send emails to new users, if any
  if (successfullyCreatedInvites.length > 0) {
    // 1. Get the invite email template
    let content: string;

    try {
      content = getContentFor(EmailTemplate.INVITE);
    } catch (e) {
      // This should never happen, but if it does, we should delete the created invites

      await client.invite.deleteMany({
        where: {
          email: {
            in: newUsers.map((invite) => invite.email),
          },
        },
      });

      throw new EmailTemplateNotFoundError();
    }

    // 2. Format the content
    const emailBody: BulkInviteEmailRequestBody = {
      htmlContent: content,
      subject: 'You have been invited to join the SIWMA Marketplace',
      messageVersions: successfullyCreatedInvites.map((invite) => ({
        to: [
          {
            email: invite.email,
            name: invite.name,
          },
        ],
        params: {
          name: invite.name,
          companyName: invite.company,
          registrationUrl: 'https://siwmae.com/register',
        },
      })),
    };

    // 3. Send the email
    const emailResponse = await sendEmails(emailBody);

    if (!emailResponse.success) {
      // Since the email failed to send, we should delete the invites that were created
      successfullyCreatedInvites.forEach(async (invite) => {
        await client.invite.delete({
          where: {
            email: invite.email,
          },
        });
      });

      throw emailResponse.error ?? new EmailSendError();
    }
  }

  if (errors.length === 0) {
    return res.status(204).end();
  }

  return res.status(207).json(formatAPIResponse(errors));
});
