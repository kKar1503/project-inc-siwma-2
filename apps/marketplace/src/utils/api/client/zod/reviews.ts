import { z } from 'zod';

const id = z.string();
const review = z.string();
const rating = z.number();
const userId = z.string();
const listingId = z.string();
const createdAt = z.string().datetime();
const type = z.string();
const avgRating = z.number();
const count = z.number();

const reviewSchema = z.object({
    id,
    review,
    rating,
    userId,
    listingId,
    createdAt,
    type
});

const responseSchema = z.object({
    avgRating,
    count,
    reviews: reviewSchema.array()
});

export type ReviewResponseBody = z.infer<typeof responseSchema>;
export type Review = z.infer<typeof reviewSchema>;

export default {
    getAll: responseSchema,
};
