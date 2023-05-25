import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import PrismaClient, { Prisma } from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { listingSchema } from '@/utils/api/server/zod';
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

    res.status(200).json(formatAPIResponse(reviews));
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
    const { review, rating } = listingSchema.post.review.parse(req.body);
    const offer = await PrismaClient.messages.findMany({
        where: {
            offer: { not: null, },
            offersMessagesOfferTooffers: {
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
    res.status(200).json(formatAPIResponse(createdReview));

};

export default apiHandler().get(getListingReviews).post(createListingReview);
