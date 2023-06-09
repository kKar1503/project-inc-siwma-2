import apiClient from '@/utils/api/client/apiClient';
import listing from '@/utils/api/client/zod/listings';

const fetchListing = async (listingID: string) => {
  const response = await apiClient.get(`v1/listings/${listingID}`);
  // parse data through zod to ensure data is correct
  const listingData = listing.getById.parse(response.data.data[0]);
  return listingData;
};

export default fetchListing;

export default fetchListing;