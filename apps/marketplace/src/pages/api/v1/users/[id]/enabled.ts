import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import { NotFoundError } from '@/errors/QueryError';

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
    const { id } = userIdSchema.parse(req.query);

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
      throw new NotFoundError('User');
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
      // This should never happen unless the user is deleted between the two queries
      throw new NotFoundError('User');
    }

    return res.status(200).json(formatAPIResponse({ visible: user.enabled }));
  }
);
