import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const payload = req.body;

  // Create log message
  const logId = (
    await PrismaClient.logs.create({
      select: {
        id: true,
      },
      data: {
        logLevel: 'info',
        logMessage: `Unbookmarked the listing - listing: ${payload.id}, listing id: ${payload.id}`,
      },
    })
  ).id;

  // Return log id
  res.status(201).json(formatAPIResponse({ logId }));
};

export default apiHandler().post(POST);
