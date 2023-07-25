import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

const fetchListing = async (listingID: string, includeParameters?: boolean) => {
  let query = `/v1/listings/${listingID}`;

  const response = await apiClient.get(query, {
    params: {
      includeParameters: includeParameters,
    },
  });
  const parsedListing = listings.getById.parse(response.data.data[0]);

  return parsedListing;
};

export default fetchListing;
