import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import client from '@inc/db';
import { z } from 'zod';
import { DuplicateError } from '@/errors';
import bcrypt from 'bcrypt';

export const inviteCreationRequestBody = z.object({
  email: z.string(),
  name: z.string(),
  company: z.string(),
});

export default apiHandler({ allowAdminsOnly: true }).post(async (req, res) => {
  // Creates a new invite
  // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.ifiq27spo70n

  const { email, name, company } = inviteCreationRequestBody.parse(req.body);

  const companyId = parseToNumber(company, 'company');

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

  return res.status(200).json(formatAPIResponse({ inviteId: invite.id }));
});
