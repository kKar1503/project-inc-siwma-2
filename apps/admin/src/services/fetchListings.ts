import apiClient from '@/utils/api/client/apiClient';
import listings, { ListingResponseBody } from '@/utils/api/client/zod/listings';

const fetchListings = async (lastListingId: number) :Promise<ListingResponseBody[]> => {
  const response = await apiClient.get(
    `/v1/listings?limit=10&lastIdPointer=${lastListingId}&includeParameters=false`
  );

  return listings.getAll.parse(response.data.data[0].listings);
};

export default fetchListings;
