import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, EmailTemplateNotFoundError, EmailSendError } from '@inc/errors';
import {
  getContentFor,
  EmailTemplate,
  BulkInviteEmailRequestBody,
} from '@inc/send-in-blue/templates';
import sendEmails from '@inc/send-in-blue/sendEmails';
import { inviteSchema } from '@/utils/api/server/zod';

async function getInvite(email: string) {
  const response = await PrismaClient.invite.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      companies: true,
      token: true,
    },
  });
  if (!response) {
    throw new NotFoundError('invite');
  }
  return response;
}

export default apiHandler({ allowNonAuthenticated: true }).post(async (req, res) => {
  const { email } = inviteSchema.email.resend.body.parse(req.body);
  const invite = await getInvite(email);

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
          registrationUrl: `${process.env.FRONTEND_URL}/register?token=${invite.token}`,
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
