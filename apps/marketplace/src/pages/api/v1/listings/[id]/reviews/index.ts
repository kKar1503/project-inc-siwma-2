import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import PrismaClient from '@inc/db';
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

const getListingReviews = async (req: APIRequestType, res: NextApiResponse) => {
    const id = parseListingId(req.query.id as string);
    const listing = await checkListingExists(id);

    if (!listing) {
        throw new NotFoundError(`Listing with id '${id}' not found.`);
    }

    let orderBy;

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
            orderBy = {};
            break;
    }


    const reviews = await PrismaClient.reviews.findMany({
        where: {
            listing: id,
        },
    });

    res.status(200).json(reviews);
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

    const listing = await checkListingExists(id);
    const { review, rating } = reviewRequestBody.parse(req.body);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.company === listing.users.companyId.toString();

    // Check that the request is coming from the owner, an admin, or someone from the same company
    if (!isOwner && !isAdmin && !sameCompany) {
        throw new ForbiddenError();
    }

    // Add the new review
    const createdReview = await PrismaClient.reviews.create({
        data: {
            id: 10,
            review: review,
            rating: rating,
            user: userId,
            listing: id,
        },
    });
    res.status(201).json(formatAPIResponse({ createdReview }));
};

export default apiHandler()
    .get(getListingReviews)
    .post(createListingReview);


