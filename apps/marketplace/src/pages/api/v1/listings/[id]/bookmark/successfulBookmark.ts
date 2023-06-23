import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient, { Listing } from '@inc/db';

export type ListingBookmarkType = {
  bookmarked: boolean;
  id: string;
  name: string;
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const payload = req.body as ListingBookmarkType;

  let action = '';

  if (payload.bookmarked === true) {
    action = 'Bookmarked';
  } else {
    action = 'Unbookmarked';
  }

  // Create log message
  const logId = (
    await PrismaClient.logs.create({
      select: {
        id: true,
      },
      data: {
        logLevel: 'info',
        logMessage: `${action} the listing - listing: ${payload.name}, listing id: ${payload.id}`,
      },
    })
  ).id;

  // Return log id
  res.status(201).json(formatAPIResponse({ logId }));
};

export default apiHandler().post(POST);
