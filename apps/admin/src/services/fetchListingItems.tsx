import apiClient from '@/utils/api/client/apiClient';
import products from '@/utils/api/client/zod/products';
import { GetProductQueryParameter } from '@/utils/api/server/zod';

const fetchListingItems = async ({ lastIdPointer, limit }: GetProductQueryParameter) => {
  const response = await apiClient.get('/v1/products', {
    params: {
      lastIdPointer,
      limit,
    },
  });

  // parse data through zod to ensure that data is correct
  const totalCount = response.data.data[0].totalCount as number;
  const listingItemsData = products.getAll.parse(response.data.data[0].listingItems);

  return { totalCount, listingItemsData };
};

export default fetchListingItems;
