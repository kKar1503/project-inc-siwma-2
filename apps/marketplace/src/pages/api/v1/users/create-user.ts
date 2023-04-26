import { apiHandler } from '@/utils/api';
import { formatAPIResponse } from '@/utils/stringUtils';
import PrismaClient from '@/utils/prisma';
import { z } from 'zod';

export default apiHandler(
  // unprotected route
  { allowNonAuthenticated: true }
).post(async (req, res) => {
  // Creates a new user from an existing invite
  // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.5t8qrsbif9ei

  const { token, mobileNumber, password } = req.body;

  if (!token || !mobileNumber || !password) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'missing required fields' }));
  }

  // Check if the token exists
  const invite = await PrismaClient.invite.findMany({
    where: {
      token,
    },
  });

  // Check if the invite is valid
  if (!invite || invite.expiresAt < new Date()) {
    return res.status(403).json(formatAPIResponse({ status: '403', detail: 'invalid token' }));
  }

  // Check if the mobile number is already in use
  const existingUser = await PrismaClient.users.findMany({
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
  const user = await PrismaClient.users.create({
    data: {
      email: invite.email,
      name: invite.name,
      phone: mobileNumber,
      password,
    },
  });

  // Delete the invite
  await PrismaClient.invite.delete({
    where: {
      token,
    },
  });

  return res.status(200).json(formatAPIResponse({ status: '201', userId: user.id }));
});

export const userCreationRequestBody = z.object({
  token: z.string(),
  mobileNumber: z.number(),
  password: z.string(),
});

export const userCreationResponseBody = z.object({
  userId: z.string(),
  status: z.number(),
  detail: z.string(),
});
