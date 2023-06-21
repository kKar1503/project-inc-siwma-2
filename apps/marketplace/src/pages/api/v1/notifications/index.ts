import { apiHandler } from '@/utils/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import handleNotifications from '@/utils/api/server/notificationHandler';
import { ForbiddenError } from '@inc/errors';

export default apiHandler({ allowNonAuthenticated: true }).post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // This endpoint is only called by the AWS EventScheduler

    const apikey = req.headers.karlokspw as string;

    if (apikey !== process.env.CHALLENGE_API_KEY) {
      throw new ForbiddenError();
    }

    await handleNotifications();

    return res.status(204).end();
  }
);
