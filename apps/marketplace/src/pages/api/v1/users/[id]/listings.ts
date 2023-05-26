import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { Prisma } from '@inc/db';
import { listingSchema, userSchema } from '@/utils/api/server/zod';
import { ParamError, NotFoundError } from '@inc/errors';
import { formatSingleListingResponse } from '../../listings';

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

  // Decode params if it exists
  let decodedParams = null;
  if (queryParams.params) {
    decodedParams = JSON.parse(decodeURI(queryParams.params));
    if (typeof decodedParams.paramId !== 'string' && typeof decodedParams.value !== 'string') {
      throw new ParamError('paramId and value');
    }
    if (typeof decodedParams.paramId !== 'string') {
      throw new ParamError('paramId');
    }
    if (typeof decodedParams.value !== 'string') {
      throw new ParamError('value');
    }
  }

  // Filter options
  const whereOptions: Prisma.ListingWhereInput = {
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
    listingsParametersValues: decodedParams
      ? {
          some: {
            parameterId: Number(decodedParams.paramId),
            value: decodedParams.value,
          },
        }
      : undefined,
  };

  // Sorting options
  let sortByOptions: Prisma.ListingOrderByWithAggregationInput = {
    id: 'asc',
  };

  if (queryParams.sortBy) {
    switch (queryParams.sortBy.toLowerCase()) {
      case 'price_desc':
        sortByOptions = { price: 'desc' };
        break;
      case 'price_asc':
        sortByOptions = { price: 'asc' };
        break;
      case 'recent_newest':
        sortByOptions = { createdAt: 'desc' };
        break;
      case 'recent_oldest':
        sortByOptions = { createdAt: 'asc' };
        break;
      default:
        break;
    }
  }

  // Retrieve filtered and sorted listings from the database
  const listings = await PrismaClient.listing.findMany({
    where: whereOptions,
    orderBy: sortByOptions,
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

      return {
        ...listing,
        rating,
        reviewCount,
      };
    })
  );

  // Sort listings by rating, if needed
  if (queryParams.sortBy) {
    switch (queryParams.sortBy.toLowerCase()) {
      case 'highest_rating':
        listingsWithRatingsAndReviewCount.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'lowest_rating':
        listingsWithRatingsAndReviewCount.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
        break;
      default:
        break;
    }
  }

  // Format the listings
  const formattedListings = await Promise.all(
    listingsWithRatingsAndReviewCount.map((listing) =>
      formatSingleListingResponse(listing, queryParams.includeParameters)
    )
  );

  res.status(200).json(formatAPIResponse(formattedListings));
});
