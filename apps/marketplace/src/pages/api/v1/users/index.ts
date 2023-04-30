import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line import/no-named-as-default
import apiGuardMiddleware from '@/utils/api/server/middlewares/apiGuardMiddleware';
import bcrypt from 'bcryptjs';
import { ParamInvalidError, DuplicateError, InvalidRangeError } from '@/errors/QueryError';

export default apiHandler({ allowNonAuthenticated: true })
  .get(
    apiGuardMiddleware({
      allowNonAuthenticated: false,
      allowAdminsOnly: true,
    }),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const getUsersRequestBody = z.object({
        lastIdPointer: z.string().optional(),
        limit: z.number().optional(),
      });

      let lastIdPointer: string | undefined;
      let limit: number | undefined;

      if (req.body) {
        const parsedBody = getUsersRequestBody.parse(req.body);

        lastIdPointer = parsedBody.lastIdPointer;
        limit = parsedBody.limit;
      }

      const users = await client.users.findMany({
        where: {
          id: {
            gt: lastIdPointer,
          },
        },
        take: limit,
      });

      return res
        .status(200)
        .json(formatAPIResponse({ status: '200', detail: 'success', data: users }));
    }
  )
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Creates a new user from an existing invite
    // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.5t8qrsbif9ei

    const userCreationRequestBody = z.object({
      token: z.string(),
      mobileNumber: z.string(),
      password: z.string(),
    });

    // Parse the request body with zod
    const { token, mobileNumber, password } = userCreationRequestBody.parse(req.body);

    const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
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
        companies: { connect: { id: invite.company_id } },
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
