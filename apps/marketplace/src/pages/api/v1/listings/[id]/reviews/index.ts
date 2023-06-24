import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import PrismaClient, { Prisma } from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { listingSchema } from '@/utils/api/server/zod';
import { parseListingId } from '../../index';
import { checkListingExists } from '../index';
import { reviewSchemas } from '@/utils/api/client/zod';

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

    // Add pagination
    const skip = parseInt(req.query.skip as string, 10) || 0;
    const take = parseInt(req.query.take as string, 10) || 10;

    // Fetch reviews and aggregate data from database using Prisma
    const [reviews, count, avgRating] = await Promise.all([
        PrismaClient.reviews.findMany({
            where: {
                listing: id,
            },
            orderBy,
            skip,
            take,
        }),
        PrismaClient.reviews.count({
            where: {
                listing: id,
            },
        }),
        PrismaClient.reviews.aggregate({
            where: {
                listing: id,
            },
            _avg: {
                rating: true,
            },
        }).then(res => res._avg.rating || 0)
    ]);

    // format the response
    const formattedReviews = reviews.map(review => ({
        id: review.id.toString(),
        review: review.review,
        rating: review.rating,
        userId: review.user,
        listingId: review.listing.toString(),
        createdAt: review.createdAt.toISOString(),
    }));

    // Use Zod schema to validate and parse the response object
    const parsedResponse = reviewSchemas.getAll.parse({
        avgRating,
        count,
        reviews: formattedReviews
    });

    res.status(200).json(formatAPIResponse(parsedResponse));
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
            offer: { not: null, },
            offers: {
                listing: id,
                accepted: true,
            },
            author: {
                equals: userId,
            },
        },
    })
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
