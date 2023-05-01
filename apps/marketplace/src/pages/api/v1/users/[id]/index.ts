import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { z } from 'zod';
import client, { UserContacts } from '@inc/db';
import { ParamInvalidError, NotFoundError } from '@/errors/QueryError';
import { ForbiddenError } from '@/errors/AuthError';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

const userIdSchema = z.object({
  id: z.string(),
});

const userDetailsSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  //   company is a number that represents the id of the company
  company: z.string().optional(),
  profilePicture: z.string().optional(),
  mobileNumber: z.string(),
  contactMethod: z.nativeEnum(UserContacts),
});

export default apiHandler()
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { id } = userIdSchema.parse(req.query);

    const user = await client.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        companyId: true,
        createdAt: true,
        enabled: true,
        profilePicture: true,
        usersComments: isAdmin,
        phone: true,
        contact: true,
      },
    });

    return res.status(200).json(formatAPIResponse({ user }));
  })
  .put(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { id } = userIdSchema.parse(req.query);
    const { name, email, company, profilePicture, mobileNumber, contactMethod } =
      userDetailsSchema.parse(req.body);

    const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
    // Match the mobile number against the regex
    if (!phoneRegex.test(req.body.mobileNumber)) {
      throw new ParamInvalidError('mobileNumber', mobileNumber);
    }

    if (!isAdmin && req.token?.user.id !== id) {
      throw new ForbiddenError();
    }

    let companyId: number | undefined;

    if (company) {
      if (!isAdmin) {
        throw new ForbiddenError();
      }
      companyId = parseToNumber(company, 'company');
    }

    const user = await client.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        companyId,
        profilePicture,
        phone: mobileNumber,
        contact: contactMethod,
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    return res.status(200).json(formatAPIResponse({ user }));
  })
  .delete(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    async (req, res) => {
      const { id } = userIdSchema.parse(req.query);

      const user = await client.users.delete({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundError('User');
      }

      return res.status(204).end();
    }
  );
