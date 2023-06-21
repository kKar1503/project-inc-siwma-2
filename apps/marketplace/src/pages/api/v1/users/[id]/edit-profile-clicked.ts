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
      const editProfileClicked = await PrismaClient.logs.create({ 
        data: {
          logLevel: 'info',
          logMessage: `Edit Profile has been clicked - user: ${req.body.user}`,
        },
      });
      return res.status(201).json(formatAPIResponse({ logId: editProfileClicked.id }));
    } catch (error) {
      console.error(error);
      return res.status(500).json(formatAPIResponse({ error: 'Internal server error' }));
    }
  }
);
