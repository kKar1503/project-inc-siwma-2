import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { parseListingId } from '../..';
import { checkListingExists } from '..';

export type ListingBookmarkType = {
  bookmarked: boolean;
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const payload = req.body as ListingBookmarkType;

  const id = parseListingId(req.query.id as string);
  const listing = await checkListingExists(id);

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
        logMessage: `${action} the listing - Listing: ${listing.name}, Listing id: ${listing.id}`,
      },
    })
  ).id;

  // Return log id
  res.status(201).json(formatAPIResponse({ logId }));
};

export default apiHandler().post(POST);
