import { z } from 'zod';

const id = z.string();
const review = z.string();
const rating = z.number();
const userId = z.string();
const listingId = z.string();
const createdAt = z.string().datetime();
const isBuyer = z.boolean(); // Add the new key here

const reviewSchema = z.object({
    id,
    review,
    rating,
    userId,
    listingId,
    createdAt,
    isBuyer // Add the new key here
});

export type ReviewResponseBody = z.infer<typeof reviewSchema>;

const getReviews = reviewSchema.array();

export type Review = z.infer<typeof reviewSchema>;

export default {
    getAll: getReviews,
};
