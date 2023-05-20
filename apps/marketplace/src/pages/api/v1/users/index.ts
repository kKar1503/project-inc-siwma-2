import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import client from '@inc/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import bcrypt from 'bcrypt';
import { DuplicateError, InvalidRangeError, ParamInvalidError } from '@inc/errors';
import { validatePassword, validatePhone } from '@/utils/api/validate';
import { usersSchema } from '@/utils/api/server/zod';

export default apiHandler({ allowNonAuthenticated: true })
  .get(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const { limit, lastIdPointer } = usersSchema.get.query.parse(req.query);

      let limitInt: number | undefined;

      if (limit) {
        limitInt = parseToNumber(limit, 'limit');
      }

      const users = await client.users.findMany({
        where: {
          id: {
            gt: lastIdPointer,
          },
        },
        take: limitInt,
        select: {
          id: true,
          name: true,
          email: true,
          companyId: true,
          createdAt: true,
          enabled: true,
          profilePicture: true,
          comments: true, // Only admins can access this endpoint, so we can return comments
          phone: true,
          contact: true,
          whatsappNumber: true,
          telegramUsername: true,
          bio: true,
        },
      });

      const mappedUsers = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.companyId.toString(),
        createdAt: user.createdAt,
        enabled: user.enabled,
        profilePic: user.profilePicture,
        comments: user.comments,
        whatsappNumber: user.whatsappNumber,
        telegramUsername: user.telegramUsername,
        mobileNumber: user.phone,
        contactMethod: user.contact,
        bio: user.bio,
      }));

      return res.status(200).json(formatAPIResponse(mappedUsers));
    }
  )
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Creates a new user from an existing invite
    // https://docs.google.com/document/d/1cASNJAtBQxIbkwbgcgrEnwZ0UaAsXN1jDoB2xcFvZc8/edit#heading=h.5t8qrsbif9ei

    // Parse the request body with zod
    const { token, mobileNumber, password } = usersSchema.post.body.parse(req.body);

    validatePhone(mobileNumber);
    validatePassword(password);

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
