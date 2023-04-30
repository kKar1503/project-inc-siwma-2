import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import client from '@inc/db';
import { z } from 'zod';
import crypto from 'crypto';

export const inviteCreationRequestBody = z.object({
  email: z.string(),
  name: z.string(),
  // company is a number but is sent as a string because it is a query param
  company: z.string()
});

export default apiHandler(
).post(async (req, res) => {
  // Creates a new invite
  // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.ifiq27spo70n

  const parsedBody = inviteCreationRequestBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
  }

  const { email, name, company } = parsedBody.data;

  if (parseToNumber(company) === null) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'company id must be a number' }));
  }

  if (!email || !name || !company) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'missing required fields' }));
  }

  const companyId = Number(company);

  const existingUser = await client.users.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res
      .status(403)
      .json(formatAPIResponse({ status: '403', detail: 'email already in use' }));
  }

  // Create sha256 hash of the user's name, email, the current date, and a random string
  const tokenHash = await crypto
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
      company_id: companyId,
      token,
      expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  return res.status(200).json(formatAPIResponse({ status: '200', inviteId: invite.id }));
});
