import apiClient from '@/utils/api/client/apiClient';
import products, { Product } from '@/utils/api/client/zod/products';

const fetchProducts = async (options?: {
  lastListingId?: number;
  limit?: number;
  includeParameters?: boolean;
}): Promise<{ listingItems: Product[], totalCount: number }> => {
  const { lastListingId = 0, limit = 10 } = options || {};
  const response = await apiClient.get(`/v1/products?limit=${limit}&lastIdPointer=${lastListingId}`);

  return {
    listingItems: products.getAll.parse(response.data.data[0].listingItems),
    totalCount: response.data.data[0].totalCount,
  };
};

export default fetchProducts;
