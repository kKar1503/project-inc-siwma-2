import apiClient from '@/utils/api/client/apiClient';
import listing from '@/utils/api/client/zod/listings';
// import fetchListing from './fetchListing';
// import { useQuery } from 'react-query';

const postReview = async (uuid: string) => {
  const response = await apiClient.get(`v1/listings/${uuid}/review`);
  const newReview = listing.createReview.parse(response.data.data);

  return newReview;
};

export default postReview;