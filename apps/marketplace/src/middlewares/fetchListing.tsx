import listing from '@/utils/api/client/zod/listings';
import apiClient from '@/utils/api/client/apiClient';

const fetchListing = async (uuid: string) => {
  const response = await apiClient.get(`v1/users/${uuid}/listings`);
  // parse data through zod to ensure data is correct
  const listingData = listing.getAll.parse(response.data.data);
  // console.log(listingData)
  return listingData;
};

export default fetchListing;