import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

type FetchListingsParams = {
  lastIdPointer?: number;
  limit?: number;
};

const fetchListings = async ({ lastIdPointer, limit }: FetchListingsParams) => {
  const response = await apiClient.get('/v1/listings', {
    params: {
      lastIdPointer,
      limit,
    },
  });

  console.log({ response });

  // parse data through zod to ensure that data is correct
  const totalCount = response.data.data[0].totalCount as number;
  const listingsData = listings.getAll.parse(response.data.data[0].listings);

  return { totalCount, listingsData };
};

export default fetchListings;
