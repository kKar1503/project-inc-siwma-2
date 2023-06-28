import reviews from '@/utils/api/client/zod/reviews';
import apiClient from '@/utils/api/client/apiClient';

const fetchProfileReview = async (uuid: string, sortBy?: string, reviewFrom?: string) => {
  let query = `v1/users/${uuid}/reviews`;
  if (sortBy) query += `?sortBy=${sortBy}`;
  if (reviewFrom) query += `&reviewFrom=${reviewFrom}`;
  const response = await apiClient.get(query);
  // parse data through zod to ensure data is correct
  const reviewData = reviews.getAll.parse(response.data.data[0]);
  return reviewData;
};

export default fetchProfileReview;
