import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import client from '@inc/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import {
  DuplicateError,
  EmailSendError,
  NotFoundError,
  EmailTemplateNotFoundError,
} from '@inc/errors';
import { validateEmail, validateName } from '@/utils/api/validate';
import sendEmails from '@inc/send-in-blue/sendEmails';
import {
  getContentFor,
  BulkInviteEmailRequestBody,
  EmailTemplate,
} from '@inc/send-in-blue/templates';

export const inviteCreationRequestBody = z.object({
  email: z.string(),
  name: z.string(),
  company: z.string(),
});

const getInvitesRequestBody = z.object({
  lastIdPointer: z.string().optional(),
  limit: z.string().optional(),
});

export default apiHandler({
  allowNonAuthenticated: true,
  // allowAdminsOnly: true
})
  .post(async (req, res) => {
    // Creates a new invite
    // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.ifiq27spo70n

    const { email, name, company } = inviteCreationRequestBody.parse(req.body);

    const companyId = parseToNumber(company, 'company');

    validateEmail(email);
    validateName(name);

    const existingUser = await client.users.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new DuplicateError('email');
    }

    // Create token: user's name, email, the current date, and a random string
    const tokenString = `${name}${email}${new Date().toISOString()}${Math.random()}`;

    // Use bcrypt to hash the token
    const salt = await bcrypt.genSalt(10);
    const tokenHash = await bcrypt.hash(tokenString, salt);

    // Create the invite
    const invite = await client.invite.create({
      data: {
        email,
        name,
        companyId,
        token: tokenHash,
        expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    });

    // Sending Emails

    // Find the company name
    const companyRecord = await client.companies.findUnique({
      where: {
        id: companyId,
      },
      select: {
        name: true,
      },
    });

    if (!companyRecord) {
      // This should never happen
      throw new NotFoundError('Company');
    }

    // 1. Get the invite email template
    let content: string;

    try {
      content = getContentFor(EmailTemplate.INVITE);
    } catch (e) {
      // This should never happen, but if it does, we should delete the invite

      await client.invite.delete({
        where: {
          id: invite.id,
        },
      });

      throw new EmailTemplateNotFoundError();
    }

    // 2. Format the content
    const emailBody: BulkInviteEmailRequestBody = {
      htmlContent: content,
      subject: 'Join the SIWMA Marketplace',
      messageVersions: [
        {
          to: [
            {
              email,
              name,
            },
          ],
          params: {
            name,
            companyName: companyRecord.name,
            registrationUrl: `${process.env.FRONTEND_URL}/register?token=${tokenHash}`,
          },
        },
      ],
    };

    // 3. Send the email
    const emailResponse = await sendEmails(emailBody);

    if (!emailResponse.success) {
      // Since the email failed to send, we should delete the invite too
      await client.invite.delete({
        where: {
          id: invite.id,
        },
      });

      throw emailResponse.error ?? new EmailSendError();
    }

    return res.status(200).json(formatAPIResponse({ inviteId: invite.id.toString() }));
  })
  .get(async (req, res) => {
    const { lastIdPointer, limit } = getInvitesRequestBody.parse(req.query);

    let limitInt: number | undefined;
    let lastIdPointerInt: number | undefined;

    if (limit) {
      limitInt = parseToNumber(limit, 'limit');
    }
    if (lastIdPointer) {
      lastIdPointerInt = parseToNumber(lastIdPointer, 'lastIdPointer');
    }

    const invites = await client.invite.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        id: {
          gt: lastIdPointerInt,
        },
      },
      take: limitInt,
      select: {
        id: true,
        email: true,
        name: true,
        companyId: true,
      },
    });

    const mappedInvites = invites.map((invite) => ({
      id: invite.id.toString(),
      email: invite.email,
      name: invite.name,
      companyId: invite.companyId.toString(),
    }));

    return res.status(200).json(formatAPIResponse(mappedInvites));
  });
