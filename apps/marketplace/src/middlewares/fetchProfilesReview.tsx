import listing from '@/utils/api/client/zod/listings';
import apiClient from '@/utils/api/client/apiClient';

const fetchReview = async (uuid: string, sortBy?: string) => {
  let query = `v1/users/${uuid}/reviews`;
  if (sortBy) query += `?sortBy=${sortBy}`;
  const response = await apiClient.get(query);
  console.log(query);
  console.log(uuid);
  console.log(sortBy);
  // parse data through zod to ensure data is correct
  // console.log(response);
  const reviewData = listing.getReviews.parse(response.data.data);
  return reviewData;
};

export default fetchReview;
