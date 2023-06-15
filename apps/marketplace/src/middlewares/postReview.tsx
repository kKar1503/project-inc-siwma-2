import apiClient from '@/utils/api/client/apiClient';
import listing from '@/utils/api/client/zod/listings';

const postReview = async (uuid: string, review: string, rating: number) => {
  if (uuid) {
    const response = await apiClient.post(`v1/listings/${uuid}/review`, {
      review,
      rating,
    });
    const newReview = listing.createReview.parse(response.data.data);
    return newReview;
  }
  return null;
};

export default postReview;
