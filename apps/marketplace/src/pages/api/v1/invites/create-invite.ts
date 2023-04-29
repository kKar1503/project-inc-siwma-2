import { apiHandler, formatAPIResponse } from '@/utils/api';
import client from '@inc/db';

export default apiHandler(
  // unprotected route
  { allowNonAuthenticated: true }
).post(async (req, res) => {
  // Creates a new invite
  // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.ifiq27spo70n

  const { email, name, company } = req.body;

  if (   
    !email ||
    !name ||
    !company ||
    email.trim() === '' ||
    name.trim() === '' ||
    company.trim() === ''
  ) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'missing required fields' }));
  }

  // Check if the email, name, or company are already in use
  const existingUser = await client.users.findMany({
    where: {
      OR: [
        {
          email,
        },
        {
          name,
        },
        {
          companyId: company,
        },
      ],
    },
  });

  if (existingUser && existingUser.length > 0) {
    return res.status(403).json(formatAPIResponse({ status: '422', detail: 'invalid parameters' }));
  }

  // Create sha256 hash of the user's name, email, the current date, and a random string
  const tokenHash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(
      name + email + Date.now() + Math.random().toString(16).slice(2, 10)
    )
  );
  // Convert the hash to a hex string
  const token = Array.from(new Uint8Array(tokenHash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Create the invite
  const invite = await client.invite.create({
    data: {
      email,
      name,
      companyId: company,
      token,
      expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  return res.status(200).json(formatAPIResponse({ status: '200', inviteId: invite.id }));
});
