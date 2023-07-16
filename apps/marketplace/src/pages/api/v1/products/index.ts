import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { productSchema } from '@/utils/api/server/zod';
import { formatSingleListingResponse } from '../listings';

export default apiHandler({ allowAdminsOnly: true }).get(async (req, res) => {
  // Parse the query parameters
  const queryParams = productSchema.get.query.parse(req.query);

  // Retrieve filtered and sorted listings from the database
  const listings = await PrismaClient.listingItem.findMany({
    where: {
      name: queryParams.matching
        ? {
            contains: queryParams.matching,
            mode: 'insensitive',
          }
        : undefined,
    },
    skip: queryParams.lastIdPointer,
    take: queryParams.limit,
    include: {
      listings: {
        include: {
          listingsParametersValue: true,
          offers: {
            select: {
              accepted: true,
              messages: true,
            },
          },
          users: {
            include: {
              companies: true,
            },
          },
        },
      },
    },
  });

  const formatted = listings.flatMap((listingItem) =>
    listingItem.listings.map((listing) => ({ ...listing, listingItem }))
  );

  const userId = req.token?.user.id;

  // Format the listings
  const formattedListings = await Promise.all(
    formatted.map((listing) => formatSingleListingResponse(listing, userId, false))
  );

  // Get total count ignoring pagination
  const totalCount = await PrismaClient.listingItem.count({
    where: {
      name: queryParams.matching
        ? {
            contains: queryParams.matching,
            mode: 'insensitive',
          }
        : undefined,
    },
  });

  res.status(200).json(formatAPIResponse({ totalCount, listings: formattedListings }));
});
