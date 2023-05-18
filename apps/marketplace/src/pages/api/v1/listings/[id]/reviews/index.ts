import { NextApiResponse } from 'next';
import { apiHandler, } from '@/utils/api';
import { NotFoundError } from '@inc/errors';
import PrismaClient from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { parseListingId } from '../../index';
import { checkListingExists } from '../index';

/**
 * Fetches all reviews for a listing
 * @param id The listing id
 * @returns An array of reviews for the listing
 */
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
        orderBy,
    });

    res.status(200).json(reviews);
};

export default apiHandler()
    .get(getListingReviews);
