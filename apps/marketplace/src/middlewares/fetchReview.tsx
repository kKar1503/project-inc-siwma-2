import listing from '@/utils/api/client/zod/listings';
import apiClient from '@/utils/api/client/apiClient';

const fetchReview = async (uuid: string) => {
  const response = await apiClient.get(`v1/users/${uuid}/reviews`);
  // parse data through zod to ensure data is correct
  // console.log(response);
  const reviewData = listing.getAll.parse(response.data.data);
  return reviewData;
};

export default fetchReview;
