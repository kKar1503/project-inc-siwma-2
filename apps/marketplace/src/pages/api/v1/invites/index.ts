import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import client from '@inc/db';
import { z } from 'zod';
import crypto from 'crypto';
import { DuplicateError } from '@/errors';
import { validateEmail, validateName } from '@/utils/api/validate';

export const inviteCreationRequestBody = z.object({
  email: z.string(),
  name: z.string(),
  company: z.string(),
});

export default apiHandler(
  { allowAdminsOnly: true },
).post(async (req, res) => {
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

  // Create sha256 hash of the user's name, email, the current date, and a random string
  const tokenHash = crypto
    .createHash('sha256')
    .update(`${name}${email}${new Date().toISOString()}${crypto.randomBytes(16).toString('hex')}`)
    .digest();

  // Convert the hash to a hex string
  const token = Array.from(new Uint8Array(tokenHash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Create the invite
  const invite = await client.invite.create({
    data: {
      email,
      name,
      companyId,
      token,
      expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  return res.status(200).json(formatAPIResponse({ inviteId: invite.id }));
});
