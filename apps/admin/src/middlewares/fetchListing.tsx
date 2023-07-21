import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

const fetchListing = async (includeParams = false) => {
  const response = await apiClient.get(`/v1/listings?includeParameters=${includeParams}`);
  return listings.getAll.parse(response.data.data);
};

export default fetchListing;
