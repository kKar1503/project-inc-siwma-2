import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client, { UserContacts } from '@inc/db';

// eslint-disable-next-line import/no-named-as-default
import apiGuardMiddleware from '@/utils/api/server/middlewares/apiGuardMiddleware';

const userIdSchema = z.object({
  id: z.string(),
});

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const userDetailsSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  //   company is a number that represents the id of the company
  company: z
    .string()
    .optional()
    .refine((val) => !Number.isNaN(Number(val))),
  profilePicture: z.string().optional(),
  mobileNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
  contactMethod: z.string(),
});

export default apiHandler({
  allowNonAuthenticated: true,
})
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const parsedBody = userIdSchema.safeParse(req.query);

    if (!parsedBody.success) {
      return res
        .status(422)
        .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
    }

    const { id } = parsedBody.data;

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

    return res
      .status(200)
      .json(formatAPIResponse({ status: '200', detail: 'success', data: user }));
  })
  .put(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const parsedBody = userDetailsSchema.safeParse(req.body);
    const parsedQuery = userIdSchema.safeParse(req.query);

    if (!parsedBody.success || !parsedQuery.success) {
      return res
        .status(422)
        .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
    }

    const { id } = parsedQuery.data;
    const { name, email, company, profilePicture, mobileNumber, contactMethod } = parsedBody.data;

    if (!(contactMethod as UserContacts)) {
      return res
        .status(422)
        .json(formatAPIResponse({ status: '422', detail: 'invalid contact method' }));
    }

    if (!isAdmin && req.token?.user.id !== id) {
      return res.status(403).json(formatAPIResponse({ status: '403', detail: 'unauthorized' }));
    }

    if (company && !isAdmin) {
      return res.status(403).json(formatAPIResponse({ status: '403', detail: 'unauthorized' }));
    }

    const user = await client.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        companyId: Number(company),
        profilePicture,
        phone: mobileNumber,
        contact: contactMethod as UserContacts,
      },
    });

    if (!user) {
      return res.status(404).json(formatAPIResponse({ status: '404', detail: 'user not found' }));
    }

    return res
      .status(200)
      .json(formatAPIResponse({ status: '200', detail: 'success', data: user }));
  })
  .delete(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    async (req, res) => {
      const parsedBody = userIdSchema.safeParse(req.query);

      if (!parsedBody.success) {
        return res
          .status(422)
          .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
      }

      const { id } = parsedBody.data;

      const user = await client.users.delete({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json(formatAPIResponse({ status: '404', detail: 'user not found' }));
      }

      return res.status(204).json(formatAPIResponse({ status: '204' }));
    }
  );
