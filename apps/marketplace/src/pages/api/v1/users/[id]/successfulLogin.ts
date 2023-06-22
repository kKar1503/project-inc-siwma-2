import { apiHandler, formatAPIResponse } from '@/utils/api';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { userSchema } from '@/utils/api/server/zod';
import PrismaClient from '@inc/db';
import { ParamError } from '@inc/errors';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({ allowNonAuthenticated: true }).post(
  apiGuardMiddleware({
    allowAdminsOnly: true,
  }),
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = userSchema.userId.parse(req.query);
    if (!id) {
      throw new ParamError('id');
    }
    
    const creatingSuccessfulLog = await PrismaClient.logs.create({
      data: {
        logLevel: 'info',
        logMessage: `Sucessful ${req.body.role} Login - User: ${req.body.username}, UserId: ${id}`,
      },
    });
    return res.status(201).json(formatAPIResponse({ logId: creatingSuccessfulLog.id }));
  }
);
