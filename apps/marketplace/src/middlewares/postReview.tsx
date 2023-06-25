import apiClient from '@/utils/api/client/apiClient';
import listing from '@/utils/api/client/zod/listings';
import { ReviewRequestBody } from '@/utils/api/server/zod';

const postReview = async (requestBody: ReviewRequestBody, listingId: string) => {
  if (listingId) {
    const response = await apiClient.post(`v1/listings/${listingId}/reviews`, requestBody);
    const newReview = listing.createReview.parse(response.data.data);
    return newReview;
  }
  return null;
};

export default postReview;
