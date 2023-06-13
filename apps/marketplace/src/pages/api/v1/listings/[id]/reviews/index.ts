import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@inc/api/api';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import PrismaClient, { Prisma } from '@inc/db';
import { listingSchema } from '@inc/api/api/server/zod';
import { APIRequestType } from '@/types/api-types';
import { parseListingId } from '../../index';
import { checkListingExists } from '../index';

/**
 * Fetches all reviews for a listing
 * @param id The listing id
 * @returns An array of reviews for the listing
 */
// Define the Zod validation schema

const getListingReviews = async (req: APIRequestType, res: NextApiResponse) => {
  const id = parseListingId(req.query.id as string);
  const listing = await checkListingExists(id);

  if (!listing) {
    throw new NotFoundError(`Listing with id '${id}`);
  }

  let orderBy: Prisma.ReviewsOrderByWithRelationInput = {};

  switch (req.query.sortBy) {
    case 'recent_newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'recent_oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'highest_rating':
      orderBy = { rating: 'desc' };
      break;
    case 'lowest_rating':
      orderBy = { rating: 'asc' };
      break;
    default:
      break;
  }

  const reviews = await PrismaClient.reviews.findMany({
    where: {
      listing: id,
    },
    orderBy,
  });
  // format the response
  const formattedReviews = reviews.map((review) => ({
    id: review.id.toString(),
    review: review.review,
    rating: review.rating,
    userId: review.user,
    listingId: review.listing.toString(),
    createdAt: review.createdAt,
  }));
  res.status(200).json(formatAPIResponse(formattedReviews));
};

/**
 * Adds a review for a listing
 * @param id The listing id
 * @param review The review text
 * @param rating The rating score
 * @returns The newly created review
 */
const createListingReview = async (req: APIRequestType, res: NextApiResponse) => {
  const id = parseListingId(req.query.id as string);
  const userId = req.token?.user?.id;
  const { review, rating } = listingSchema.reviews.post.body.parse(req.body);
  const offer = await PrismaClient.messages.findMany({
    where: {
      offer: { not: null },
      offers: {
        listing: id,
        accepted: true,
      },
      author: {
        equals: userId,
      },
    },
  });
  // user must have made an offer on the listing
  if (!offer.length) {
    throw new ForbiddenError();
  }

  // user can only make one review per listing
  const existingReview = await PrismaClient.reviews.findFirst({
    where: {
      user: userId,
      listing: id,
    },
  });
  if (existingReview) {
    throw new ForbiddenError();
  }

  const createdReview = await PrismaClient.reviews.create({
    data: {
      review,
      rating,
      user: userId,
      listing: id,
    },
  });
  // format the response
  const formattedReview = {
    id: createdReview.id.toString(),
    review: createdReview.review,
    rating: createdReview.rating,
    userId: createdReview.user,
    listingId: createdReview.listing.toString(),
  };

  res.status(200).json(formatAPIResponse(formattedReview));
};

export default apiHandler().get(getListingReviews).post(createListingReview);
