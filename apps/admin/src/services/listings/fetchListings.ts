import apiClient from '@/utils/api/client/apiClient';
import listings, { ListingResponseBody } from '@/utils/api/client/zod/listings';

const fetchListings = async (options?: {
  lastListingId: number;
  limit: number;
  includeParameters: boolean;
}): Promise<ListingResponseBody[]> => {
  const { lastListingId = 0, limit = 10, includeParameters = false } = options || {};
  const response = await apiClient.get(
    `/v1/listings?limit=${limit}&lastIdPointer=${lastListingId}&includeParameters=${includeParameters}`,
  );

  return listings.getAll.parse(response.data.data[0].listings);
};

export default fetchListings;
