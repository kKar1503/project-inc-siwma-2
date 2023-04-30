import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
// eslint-disable-next-line import/no-named-as-default
import apiGuardMiddleware from '@/utils/api/server/middlewares/apiGuardMiddleware';

const userIdSchema = z.object({
  id: z.string(),
});

export default apiHandler({
  allowNonAuthenticated: false,
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
