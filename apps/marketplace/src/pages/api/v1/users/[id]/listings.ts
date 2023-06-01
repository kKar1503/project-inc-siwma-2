import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { listingSchema, userSchema } from '@/utils/api/server/zod';
import { NotFoundError } from '@inc/errors';
import { formatSingleListingResponse, sortOptions } from '../../listings';

export default apiHandler().get(async (req, res) => {
  // Parse the query parameters
  const queryParams = listingSchema.get.query.parse(req.query);

  const { id } = userSchema.userId.parse(req.query);

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
      owner: id,
      categoryId: queryParams.category ? queryParams.category : undefined,
      negotiable: queryParams.negotiable ? queryParams.negotiable : undefined,
      price: {
        gte: queryParams.minPrice ? queryParams.minPrice : undefined,
        lte: queryParams.maxPrice ? queryParams.maxPrice : undefined,
      },
      name: queryParams.matching
        ? {
          contains: queryParams.matching,
          mode: 'insensitive',
        }
        : undefined,
      listingsParametersValues: queryParams.params
        ? {
          some: {
            parameterId: Number(queryParams.params.paramId),
            value: queryParams.params.value,
          },
        }
        : undefined,
    },
    orderBy,
    skip: queryParams.lastIdPointer,
    take: queryParams.limit,
    include: {
      listingsParametersValues: queryParams.includeParameters,
      offersOffersListingTolistings: true,
      users: {
        include: {
          companies: true,
        },
      },
      reviewsReviewsListingTolistings: true,
    },
  });

  // Calculate the average rating and count of reviews for each listing
  const listingsWithRatingsAndReviewCount = await Promise.all(
    listings.map(async (listing) => {
      const { _avg, _count } = await PrismaClient.reviews.aggregate({
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
        where: {
          listing: listing.id,
        },
      });

      const rating = _avg && _avg.rating ? Number(_avg.rating.toFixed(1)) : null;
      const reviewCount = _count && _count.rating;
      const { multiple } = listing;

      return {
        ...listing,
        rating,
        reviewCount,
        multiple,
      };
    }),
  );

  const sortedListings = postSort(listingsWithRatingsAndReviewCount);

  // Format the listings
  const formattedListings = await Promise.all(
    sortedListings.map((listing) =>
      formatSingleListingResponse(listing, queryParams.includeParameters),
    ),
  );

  res.status(200).json(formatAPIResponse(formattedListings));
});

