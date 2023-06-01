import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

const fetchReviews = async (listingID: string) => {
  const response = await apiClient.get(`v1/categories/${listingID}`);
  // parse data through zod to ensure data is correct
  const reviewData = listings.getById.parse(response.data.data[0]);
  console.log(reviewData)
  return reviewData;
};

export default fetchReviews;