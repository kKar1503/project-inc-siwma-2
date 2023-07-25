import product from '@/utils/api/client/zod/products';
import apiClient from '@/utils/api/client/apiClient';

const fetchListingItemById = async (listingItemId: string | string[] | undefined) => {
  const response = await apiClient.get(`/v1/products/${listingItemId}`);
  const listingItemData = product.getById.parse(response.data.data[0]);
  return listingItemData;
};

export default fetchListingItemById;