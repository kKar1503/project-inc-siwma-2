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
    mobileNumber: z.string(),
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

  const { emails } = req.body;

  const parsedInvites = bulkInviteSchema.parse(emails);

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
        mobileNumber: invite.mobileNumber,
      })),
    },
  });

  // Filter out existing users
  const duplicateInvites = parsedInvites.filter((invite) =>
    existingUsers.find((user) => user.email === invite.email || user.phone === invite.mobileNumber)
  );

  // Filter out existing users and add them to the errors array
  duplicateInvites.forEach((invite) => {
    errors.push(
      new DuplicateError(`user with email ${invite.email} or phone ${invite.mobileNumber}`)
    );
  });

  const newUsers = parsedInvites.filter(
    (invite) =>
      !existingUsers.find(
        (user) => user.email === invite.email || user.phone === invite.mobileNumber
      )
  );

  const successfullyCreatedInvites: { name: string; email: string; company: string }[] = [];

  // Create invites for new users
  newUsers.forEach(async (invite) => {
    const { email, name, company, mobileNumber } = invite;
    try {
      // Company represents the company name, get the id from the db
      const companyObj = await client.companies.findFirst({
        where: {
          name: company,
        },
      });

      if (!companyObj) {
        errors.push(new NotFoundError(`company named ${company}`));
        return; // Return in a forEach loop is like continue in a for loop 🤷
      }

      // Create token: user's name, email, the current date, and a random string
      const tokenString = `${name}${email}${new Date().toISOString()}${Math.random()}`;

      // Use bcrypt to hash the token
      const salt = await bcrypt.genSalt(10);
      const tokenHash = await bcrypt.hash(tokenString, salt);

      // Create invite
      await client.invite.create({
        data: {
          email,
          name,
          companyId: companyObj.id,
          phone: mobileNumber,
          token: tokenHash,
          expiry: new Date(),
        },
      });

      successfullyCreatedInvites.push({
        name,
        email,
        company,
      });
    } catch (e) {
      if (e instanceof Error) {
        errors.push(e);
      } else {
        errors.push(new UnknownError());
      }
    }
  });

  // Send emails to new users

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

  if (errors.length === 0) {
    return res.status(204).end();
  }

  return res.status(207).json(formatAPIResponse(errors));
});
