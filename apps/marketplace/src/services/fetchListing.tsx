import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

const fetchListing = async (listingID: string) => {
  const response = await apiClient.get(
    `/v1/listings/${listingID}/?includeImages=true&includeParameters=true`
  );
  console.dir(response, { depth: null });
  const parsedListing = listings.getById.parse(response.data.data[0]);

  return parsedListing;
};

export default fetchListing;
