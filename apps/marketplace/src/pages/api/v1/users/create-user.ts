import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const userCreationRequestBody = z.object({
  token: z.string(),
  mobileNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
  password: z.string(),
});

export const userCreationResponseBody = z.object({
  userId: z.string(),
  status: z.number(),
  detail: z.string(),
});

export default apiHandler(
  // This route does not require authentication
  { allowNonAuthenticated: true }
).post(async (req: NextApiRequest, res: NextApiResponse) => {
  // Creates a new user from an existing invite
  // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.5t8qrsbif9ei

  // Parse the request body with zod
  const parsedBody = userCreationRequestBody.safeParse(req.body);

  // Exit if the body is invalid
  if (!parsedBody.success) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
  }

  // Extract the required fields
  const { token, mobileNumber, password } = parsedBody.data;

  if (!token || !mobileNumber || !password) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'missing required fields' }));
  }

  // Check if the token exists
  const invite = await client.invite.findFirst({
    where: {
      token,
    },
  });

  // Check if the invite is valid
  if (!invite) {
    return res.status(403).json(formatAPIResponse({ status: '403', detail: 'invalid token' }));
  }

  // Verify invite expiry
  if (invite.expiry < new Date()) {
    return res.status(403).json(formatAPIResponse({ status: '403', detail: 'expired token' }));
  }

  // Check if the mobile number is already in use
  const existingUser = await client.users.findMany({
    where: {
      phone: mobileNumber,
    },
  });

  if (existingUser && existingUser.length > 0) {
    return res
      .status(403)
      .json(formatAPIResponse({ status: '422', detail: 'mobile number already in use' }));
  }

  // Create the user
  const user = await client.users.create({
    data: {
      email: invite.email,
      name: invite.name,
      phone: mobileNumber,
      password,
      contact: 'phone',
      companies: { connect: { id: invite.companyId } },
    },
  });

  // Delete the invite
  await client.invite.delete({
    where: {
      id: invite.id,
    },
  });

  return res.status(200).json(formatAPIResponse({ status: '201', userId: user.id }));
});

