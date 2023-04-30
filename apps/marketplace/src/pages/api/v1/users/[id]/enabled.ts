import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';

// eslint-disable-next-line import/no-named-as-default
import apiGuardMiddleware from '@/utils/api/server/middlewares/apiGuardMiddleware';

const userIdSchema = z.object({
  id: z.string(),
});

export default apiHandler({
  allowNonAuthenticated: true,
}).patch(
  apiGuardMiddleware({
    allowNonAuthenticated: true,
    allowAdminsOnly: false,
  }),
  async (req, res) => {
    const parsedBody = userIdSchema.safeParse(req.query);

    if (!parsedBody.success) {
      return res
        .status(422)
        .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
    }

    const { id } = parsedBody.data;

    // Get user's enabled status
    const fetchedUser = await client.users.findUnique({
      where: {
        id,
      },
      select: {
        enabled: true,
      },
    });

    if (!fetchedUser) {
      return res.status(404).json(formatAPIResponse({ status: '404', detail: 'user not found' }));
    }

    const user = await client.users.update({
      where: {
        id,
      },
      data: {
        enabled: !fetchedUser?.enabled,
      },
    });

    if (!user) {
      return res.status(404).json(formatAPIResponse({ status: '404', detail: 'user not found' }));
    }

    return res.status(200).json(formatAPIResponse({ status: '200', visible: user.enabled }));
  }
);
