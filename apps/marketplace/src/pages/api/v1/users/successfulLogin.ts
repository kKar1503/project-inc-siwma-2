import { apiHandler, formatAPIResponse } from '@/utils/api';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import PrismaClient from '@inc/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({ allowNonAuthenticated: true }).post(
  apiGuardMiddleware({
    allowAdminsOnly: true,
  }),
  async (req: NextApiRequest, res: NextApiResponse) => {
    const creatingSuccessfulLog = await PrismaClient.logs.create({
      data: {
        logLevel: 'info',
        logMessage: `Sucessful ${req.body.role} Login - user: ${req.body.user}`,
      },
    });
    return res.status(201).json(formatAPIResponse({ logId: creatingSuccessfulLog.id }));
  }
);
