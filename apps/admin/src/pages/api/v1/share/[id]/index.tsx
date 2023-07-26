// ** Utils Imports
import { apiHandler, formatAPIResponse } from '@/utils/api';

// ** Prisma Imports
import PrismaClient from '@inc/db';

// ** Error Imports
import { NotFoundError } from '@inc/errors';

export default apiHandler().get(async (req, res) => {
  const { id } = req.query;

  const shareData = await PrismaClient.share.findMany({
    where: {
      hash: id as string,
    },
  });

  if (shareData.length === 0) {
    throw new NotFoundError('Share hash');
  }

  const shareId = shareData[0].id;

  const listingData = await PrismaClient.sharesListings.findMany({
    where: {
      hash: shareId,
    },
  });

  const listingArr = [];

  // push listing ids into array
  for (let i = 0; i < listingData.length; i++) {
    listingArr.push(listingData[i].listing.toString());
  }

  res
    .status(200)
    .json(formatAPIResponse({ ownerId: shareData[0].owner, listingItems: listingArr }));
});
