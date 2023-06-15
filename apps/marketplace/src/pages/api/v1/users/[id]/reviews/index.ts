import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { Prisma } from '@inc/db';
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

    // Check if user exists
    const user = await PrismaClient.users.findUnique({
        where: { id },
    });
    if (!user) {
        throw new NotFoundError('User');
    }

    // Determine sort order based on sortBy parameter
    const orderBy = orderByOptions(sortBy);

    // Fetch reviews from database using Prisma
    const reviews = await PrismaClient.reviews.findMany({
        where: { user: id },
        orderBy,
    });

    const formatReviews = reviews.map(review => ({
        ...review,
        id: review.id.toString(),
        listingId: review.listing.toString(),
        createdAt: review.createdAt.toISOString(),
        userId: review.user.toString(),


    }));

    // Validate response body using Zod schema
    const parsedReviews = reviewSchemas.getAll.parse(formatReviews);

    res.status(200).json(formatAPIResponse(parsedReviews));
};

export default apiHandler()
    .get(getUserReviews)
