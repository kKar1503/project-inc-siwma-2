import apiClient from '@/utils/api/client/apiClient';
import products from '@/utils/api/client/zod/products';

const createListingItemData = async (
  name: string,
  chineseName: string,
  description: string,
  categoryId: string,
  unit: string,
  chineseUnit: string
) => {
  const response = await apiClient.post(`/v1/products`, {
    name,
    chineseName,
    description,
    categoryId,
    unit,
    chineseUnit,
  });

  console.log({ response });
  const createdListingItem = products.create.parse(response.data.data[0]);

  return createdListingItem;
};

export default createListingItemData;
