import { apiHandler, formatAPIResponse } from '@/utils/api';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import PrismaClient from '@inc/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({ allowNonAuthenticated: true }).post(
  apiGuardMiddleware({
    allowAdminsOnly: true,
  }),
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { userId, updatedFields } = req.body.user;

      const log = await PrismaClient.logs.create({
        select: {
          id: true,
        },
        data: {
          logLevel: 'info',
          logMessage: `User ${userId} has updated profile . Updated fields: ${JSON.stringify(
            updatedFields
          )}`,
        },
      });

      res.status(201).json(formatAPIResponse({ logId: log.id }));
    } catch (error) {
      console.error(error);
      res.status(500).json(formatAPIResponse({ error: 'Internal server error' }));
    }
  }
);
