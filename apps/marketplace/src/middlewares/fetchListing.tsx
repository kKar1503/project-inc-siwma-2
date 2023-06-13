import apiClient from '@inc/api/api/client/apiClient';
import listing from '@inc/api/api/client/zod/listings';

const fetchListing = async (listingID: string) => {
  const response = await apiClient.get(`v1/listings/${listingID}`);
  // parse data through zod to ensure data is correct
  const listingData = listing.getById.parse(response.data.data[0]);
  return listingData;
};

export default fetchListing;
