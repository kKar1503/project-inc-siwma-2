import { apiHandler, formatAPIResponse } from '@/utils/api';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import PrismaClient from '@inc/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({ allowNonAuthenticated: true })
.post(
  apiGuardMiddleware({
    allowAdminsOnly: true,
  }),
  async (req: NextApiRequest, res: NextApiResponse) => {
    const creatingUnsuccessfulLog = await PrismaClient.logs.create({
      data: {
        logLevel: 'error',
        logMessage: 'Unsucessful Login - Login failed',
      },
    });
    return res.status(201).json(formatAPIResponse({ logId: creatingUnsuccessfulLog.id }));
  }
);
