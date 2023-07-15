import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { listingSchema, userSchema } from '@/utils/api/server/zod';
import { NotFoundError } from '@inc/errors';
import { formatSingleListingResponse, sortOptions } from '../../listings';

export default apiHandler().get(async (req, res) => {
  // Parse the query parameters
  const queryParams = listingSchema.get.query.parse(req.query);

  const { id } = userSchema.userId.parse(req.query);

  // Obtain the id of the user making the request
  const requester = req.token?.user?.id;

  // Verify that the user exists
  const userExists = await PrismaClient.users.findUnique({
    where: {
      id,
    },
  });

  if (!userExists) {
    throw new NotFoundError('User');
  }

  const { orderBy, postSort } = sortOptions(queryParams.sortBy);

  // Retrieve filtered and sorted listings from the database
  const listings = await PrismaClient.listing.findMany({
    where: {
      listingItem: {
        categoryId: queryParams.category ? queryParams.category : undefined,
        name: queryParams.matching
          ? {
              contains: queryParams.matching,
              mode: 'insensitive',
            }
          : undefined,
      },
      owner: id,
      negotiable: queryParams.negotiable != null ? queryParams.negotiable : undefined,
      type: queryParams.type ? queryParams.type : undefined,
      price: {
        gte: queryParams.minPrice ? queryParams.minPrice : undefined,
        lte: queryParams.maxPrice ? queryParams.maxPrice : undefined,
      },
      deletedAt: null,
      listingsParametersValue: queryParams.params
        ? {
            parameters: {
              array_contains: [
                {
                  parameterId: queryParams.params.paramId,
                  value: queryParams.params.value,
                },
              ],
            },
          }
        : undefined,
    },
    orderBy,
    skip: queryParams.lastIdPointer,
    take: queryParams.limit,
    include: {
      listingItem: true,
      listingsParametersValue: queryParams.includeParameters,
      offers: {
        select: {
          accepted: true,
          messages: {
            select: {
              author: true,
            },
          },
        },
      },
      users: {
        include: {
          companies: true,
        },
      },
    },
  });

  const sortedListings = postSort(listings);

  // Format the listings
  const formattedListings = await Promise.all(
    sortedListings.map((listing) =>
      formatSingleListingResponse(listing, requester, queryParams.includeParameters)
    )
  );

  res.status(200).json(formatAPIResponse(formattedListings));
});
