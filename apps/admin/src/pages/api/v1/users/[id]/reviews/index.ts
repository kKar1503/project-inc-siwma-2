import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { ListingType, Prisma } from '@inc/db';
import { NotFoundError } from '@inc/errors';
import { APIRequestType } from '@/types/api-types';
import { userSchema } from '@/utils/api/server/zod';
import { reviewSchemas } from '@/utils/api/client/zod';

function orderByOptions(sortBy: string | undefined): Prisma.ReviewsOrderByWithRelationInput {
  switch (sortBy) {
    case 'recent_newest':
      return { createdAt: 'desc' };
    case 'recent_oldest':
      return { createdAt: 'asc' };
    case 'highest_rating':
      return { rating: 'desc' };
    case 'lowest_rating':
      return { rating: 'asc' };
    default:
      // Default sort order
      return { createdAt: 'desc' };
  }
}

const getUserReviews = async (req: APIRequestType, res: NextApiResponse) => {
  const { id } = userSchema.userId.parse(req.query);
  const sortBy = req.query.sortBy as string;
  const reviewFrom = req.query.reviewFrom as string | undefined;
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const take = parseInt(req.query.take as string, 10) || 10;

  let reviewType: ListingType | undefined;
  if (reviewFrom) {
    if (reviewFrom === 'seller') {
      reviewType = 'BUY';
    } else if (reviewFrom === 'buyer') {
      reviewType = 'SELL';
    }
  }

  // Check if user exists
  const user = await PrismaClient.users.findUnique({
    where: { id },
  });
  if (!user) {
    throw new NotFoundError('User');
  }

  // Determine sort order based on sortBy parameter
  const orderBy = orderByOptions(sortBy);

  // Fetch reviews and aggregate data from database using Prisma
  const [reviews, count, avgRating] = await Promise.all([
    PrismaClient.reviews.findMany({
      where: {
        listingReviewsListingTolisting: {
          owner: id,
          ...(reviewType && {
            type: reviewType,
          }),
        },
      },
      orderBy,
      include: {
        listingReviewsListingTolisting: true,
      },
      skip,
      take,
    }),
    PrismaClient.reviews.count({
      where: {
        listingReviewsListingTolisting: {
          owner: id,
        },
      },
    }),
    PrismaClient.reviews
      .aggregate({
        where: {
          listingReviewsListingTolisting: {
            owner: id,
          },
        },
        _avg: {
          rating: true,
        },
      })
      .then((res) => res._avg.rating || 0),
  ]);

  const formatReviews = reviews.map((review) => ({
    ...review,
    id: review.id.toString(),
    listingId: review.listing.toString(),
    createdAt: review.createdAt.toISOString(),
    userId: review.user.toString(),
    type: review.listingReviewsListingTolisting.type === 'BUY' ? 'seller' : 'buyer',
  }));

  // Format the response object
  const parsedResponse = reviewSchemas.getAll.parse({
    avgRating,
    count,
    reviews: formatReviews,
  });

  res.status(200).json(formatAPIResponse(parsedResponse));
};

export default apiHandler().get(getUserReviews);