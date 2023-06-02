import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

const fetchReviews = async (listingID: string) => {
  const response = await apiClient.get(`v1/listings/${listingID}/reviews`);
  // parse data through zod to ensure data is correct
  const reviewData = listings.getReviews.parse(response.data.data[0]);
  return reviewData;
};

export default fetchReviews;