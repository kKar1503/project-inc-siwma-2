import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import PrismaClient, { Prisma } from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { parseListingId } from '../../index';
import { checkListingExists } from '../index';
import { z } from 'zod';

/**
 * Fetches all reviews for a listing
 * @param id The listing id
 * @returns An array of reviews for the listing
 */
// Define the Zod validation schema
const reviewRequestBody = z.object({
    review: z.string(),
    rating: z.number().min(0).max(5),
});
const reviewResponseSchema = z.object({
    id: z.number(),
    review: z.string(),
    rating: z.number(),
    user: z.string(),
    listing: z.number(),
    createdAt: z.date(), // Use z.date() if the date is returned as a Date object
});



const getListingReviews = async (req: APIRequestType, res: NextApiResponse) => {
    const id = parseListingId(req.query.id as string);
    const listing = await checkListingExists(id);

    if (!listing) {
        throw new NotFoundError(`Listing with id '${id}' not found.`);
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
        orderBy: orderBy,
    });

    res.status(200).json(formatAPIResponse(reviews.map((review) => reviewResponseSchema.parse(review))));
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
    const userRole = req.token?.user?.role;
    const { review, rating } = reviewRequestBody.parse(req.body);
    const offers = await PrismaClient.offers.findMany({
        where: {
            listing: id,
            accepted: true,
        },
    });
    const messageNumber = offers.map((offer) => offer.message);

    const messages = await PrismaClient.messages.findMany({
        where: {
            id: {
                in: messageNumber,
            },
        },
    });
    const author = messages.map((message) => message.author)
    if (!author.includes(userId)) {
        throw new ForbiddenError();
    }
    const createdReview = await PrismaClient.reviews.create({
        data: {
            review: review,
            rating: rating,
            user: userId,
            listing: id,
        },
    });
    res.status(201).json(formatAPIResponse(reviewResponseSchema.parse(createdReview)));
};

export default apiHandler().get(getListingReviews).post(createListingReview);
