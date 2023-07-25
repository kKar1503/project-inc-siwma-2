import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';
import { GetListingsQueryParameter } from '@/utils/api/server/zod';

const fetchListings = async ({ lastIdPointer, limit, includeName }: GetListingsQueryParameter) => {
  const response = await apiClient.get('/v1/listings', {
    params: {
      lastIdPointer,
      limit,
      includeName,
    },
  });

  console.log({ response });

  // parse data through zod to ensure that data is correct
  const totalCount = response.data.data[0].totalCount as number;
  const listingsData = listings.getAll.parse(response.data.data[0].listings);

  return { totalCount, listingsData };
};

export default fetchListings;
