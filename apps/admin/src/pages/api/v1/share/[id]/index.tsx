// ** Utils Imports
import { apiHandler, formatAPIResponse } from '@/utils/api';

// ** Prisma Imports
import PrismaClient from '@inc/db';

export default apiHandler().get(async (req, res) => {
  const { id } = req.query;
  console.log(id);

  const shareData = await PrismaClient.share.findMany({
    where: {
      hash: id as string,
    },
  });

  const shareId = shareData[0].id;

  const listingData = await PrismaClient.sharesListings.findMany({
    where: {
      hash: shareId,
    },
  });

  const listingArr = [];

  for (let i = 0; i < listingData.length; i++) {
    listingArr.push(listingData[i].listing.toString());
  }

  res
    .status(200)
    .json(formatAPIResponse({ ownerId: shareData[0].id.toString(), listingItems: listingArr }));
});
