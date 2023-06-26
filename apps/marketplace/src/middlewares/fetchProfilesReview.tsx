// import listing from '@/utils/api/client/zod/listings';
import reviews from '@/utils/api/client/zod/reviews';
import apiClient from '@/utils/api/client/apiClient';

const fetchProfileReview = async (uuid: string, sortBy?: string) => {
  let query = `v1/users/${uuid}/reviews`;
  if (sortBy) query += `?sortBy=${sortBy}`;
  const response = await apiClient.get(query);
  // parse data through zod to ensure data is correct
  const reviewData = reviews.getAll.parse(response.data.data[0]);
  return reviewData;
};

export default fetchProfileReview;
