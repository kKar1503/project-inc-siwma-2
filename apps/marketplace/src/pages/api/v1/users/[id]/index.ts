import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { z } from 'zod';
import client, { UserContacts } from '@inc/db';
import { ParamInvalidError, NotFoundError } from '@/errors/QueryError';
import { ForbiddenError } from '@/errors/AuthError';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

const userIdSchema = z.object({
  id: z.string(),
});

const updateUserDetailsSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  //   company is a number that represents the id of the company
  company: z.string().optional(),
  profilePicture: z.string().optional(),
  mobileNumber: z.string().optional(),
  contactMethod: z.nativeEnum(UserContacts).optional(),
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
    updateUserDetailsSchema.parse(req.body);

    // Phone Regex: 8 digits or more, allow spaces, dashes, and parentheses
    const phoneRegex = /^(\d{8,})(?:\s|-|\()?\d{3,}(?:\s|-|\()?\d{3,}$/;
    // Match the mobile number against the regex
    if (!phoneRegex.test(req.body.mobileNumber)) {
      throw new ParamInvalidError('mobileNumber', mobileNumber);
    }

    // Users can edit their own details, and admins can edit anyone's details
    // Therefore, we cannot simply block the entire endpoint for non-admin users
    if (!isAdmin && req.token?.user.id !== id) {
      throw new ForbiddenError();
    }

    let companyId: number | undefined;

    // Users cannot change their company, but admins can change anyone's company (per API specs)
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
