import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors';
import z from 'zod';

// Define the schema for the request parameters
const getReviewsRequestParams = z.object({
    id: z.string(),
});

export default apiHandler()
    .get(async (req, res) => {
        const { id } = getReviewsRequestParams.parse(req.query);

        // Retrieve the reviews for the user from the database
        const reviews = await PrismaClient.reviews.findMany({
            where: { userId: id },
        });

        // Check if the user has any reviews
        if (reviews.length === 0) {
            throw new NotFoundError(`No reviews found for user with id '${id}'`);
        }

        // Return the reviews
        res.status(200).json(formatAPIResponse(reviews));
    });
