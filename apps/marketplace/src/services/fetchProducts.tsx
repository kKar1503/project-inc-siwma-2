import apiClient from '@/utils/api/client/apiClient';
import products from '@/utils/api/client/zod/products';
import { GetProductQueryParameter } from '@/utils/api/server/zod';

const fetchProducts = async (lastIdPointer?: number) => {
  // Construct the query param object
  const params: GetProductQueryParameter = {
    limit: 99999,
    lastIdPointer,
  };

  // Perform the query
  const response = await apiClient.get(`/v1/products`, {
    params,
  });

  // parse data through zod to ensure that data is correct
  const listingsData = products.getAll.parse(response.data.data[0].listingItems);

  return listingsData;
};

export default fetchProducts;
