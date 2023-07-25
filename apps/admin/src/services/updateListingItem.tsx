import apiClient from '@/utils/api/client/apiClient';
import products from '@/utils/api/client/zod/products';

const updateListingItemData = async (
  requestBody: {
    name: string;
    chineseName: string;
    description: string;
    categoryId: string;
    unit: string;
    chineseUnit: string;
  },
  listingItemId: string
) => {
  if (!listingItemId) {
    return null;
  }

  const response = await apiClient.put(`/v1/products/${listingItemId}`, requestBody);
  const parsedCategory = products.update.parse(response.data.data[0]);

  return parsedCategory;
};

export default updateListingItemData;
