import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import bcrypt from 'bcrypt';
import { ParamInvalidError, DuplicateError, InvalidRangeError } from '@/errors/QueryError';

const getUsersRequestBody = z.object({
  lastIdPointer: z.string().optional(),
  limit: z.number().optional(),
});

const userCreationRequestBody = z.object({
  token: z.string(),
  mobileNumber: z.string(),
  password: z.string(),
});

export default apiHandler({ allowNonAuthenticated: true })
  .get(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const { lastIdPointer, limit } = getUsersRequestBody.parse(req.query);

      const users = await client.users.findMany({
        where: {
          id: {
            gt: lastIdPointer,
          },
        },
        take: limit,
      });

      return res.status(200).json(formatAPIResponse({ users }));
    }
  )
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Creates a new user from an existing invite
    // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.5t8qrsbif9ei

    // Parse the request body with zod
    const { token, mobileNumber, password } = userCreationRequestBody.parse(req.body);

    // Phone Regex: 8 digits or more, allow spaces, dashes, and parentheses
    const phoneRegex = /^(\d{8,})(?:\s|-|\()?\d{3,}(?:\s|-|\()?\d{3,}$/;
    // Match the mobile number against the regex
    if (!phoneRegex.test(req.body.mobileNumber)) {
      throw new ParamInvalidError('mobileNumber', mobileNumber);
    }

    // Check if the token exists
    const invite = await client.invite.findFirst({
      where: {
        token,
      },
    });

    // Check if the invite is valid
    if (!invite) {
      throw new ParamInvalidError('token', token);
    }

    // Verify invite expiry
    if (invite.expiry < new Date()) {
      throw new InvalidRangeError(
        'expiry',
        undefined,
        invite.expiry.toString(),
        Date.now().toString()
      );
    }

    // Check if the mobile number is already in use
    const existingUser = await client.users.findMany({
      where: {
        phone: mobileNumber,
      },
    });

    if (existingUser && existingUser.length > 0) {
      throw new DuplicateError('mobile number');
    }

    // Hash password with bcrrypt and genSalt(10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await client.users.create({
      data: {
        email: invite.email,
        name: invite.name,
        phone: mobileNumber,
        password: hashedPassword,
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

    return res.status(201).json(formatAPIResponse({ userId: user.id }));
  });
