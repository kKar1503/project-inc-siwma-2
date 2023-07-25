import apiClient from '@/utils/api/client/apiClient';
import listing from '@/utils/api/client/zod/listings';

const fetchListings = async () => {
  const response = await apiClient.get(`v1/listings/`);
  // parse data through zod to ensure data is correct
  const listingData = listing.getAll.parse(response.data.data);
  return listingData;
};

export default fetchListings;