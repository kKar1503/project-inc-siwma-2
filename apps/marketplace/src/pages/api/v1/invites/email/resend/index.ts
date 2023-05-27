import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import {
  NotFoundError,
  EmailTemplateNotFoundError,
  EmailSendError,
  ExpiredError,
} from '@inc/errors';
import {
  getContentFor,
  EmailTemplate,
  BulkInviteEmailRequestBody,
} from '@inc/send-in-blue/templates';
import sendEmails from '@inc/send-in-blue/sendEmails';
import { inviteSchema } from '@/utils/api/server/zod';
import bcrypt from 'bcrypt';

async function getInvite(email: string) {
  const response = await PrismaClient.invite.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      companyId: true,
      expiry: true,
      companies: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!response) {
    throw new NotFoundError('Invite');
  }
  return response;
}

async function regenerateInvite(invite: Awaited<ReturnType<typeof getInvite>>, tokenHash: string) {
  // delete the old invite
  await PrismaClient.invite.delete({
    where: {
      id: invite.id,
    },
  });

  // regenerate the invite with a new expiry date
  await PrismaClient.invite.create({
    data: {
      name: invite.name,
      email: invite.email,
      phone: invite.phone,
      companyId: invite.companyId,
      token: tokenHash,
      expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    },
  });
}

export default apiHandler({ allowAdminsOnly: true }).post(async (req, res) => {
  const { email } = inviteSchema.email.resend.body.parse(req.body);
  const invite = await getInvite(email);

  if (invite.expiry < new Date()) {
    throw new ExpiredError('Invite');
  }

  const tokenString = `${invite.name}${invite.email}${new Date().toISOString()}${Math.random()}`;
  const salt = await bcrypt.genSalt(10);
  const tokenHash = await bcrypt.hash(tokenString, salt);

  regenerateInvite(invite, tokenHash);

  let content: string;
  try {
    content = getContentFor(EmailTemplate.INVITE);
  } catch (e) {
    throw new EmailTemplateNotFoundError();
  }

  const emailBody: BulkInviteEmailRequestBody = {
    htmlContent: content,
    subject: 'Join the SIWMA Marketplace',
    messageVersions: [
      {
        to: [
          {
            email,
            name: invite.name,
          },
        ],
        params: {
          name: invite.name,
          companyName: invite.companies.name,
          registrationUrl: `${process.env.FRONTEND_URL}/register?token=${tokenHash}`,
        },
      },
    ],
  };

  const emailResponse = await sendEmails(emailBody);

  if (!emailResponse.success) {
    throw emailResponse.error ?? new EmailSendError();
  }

  res.status(204).end();
});
