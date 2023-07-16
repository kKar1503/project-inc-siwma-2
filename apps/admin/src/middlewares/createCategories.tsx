import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';
import { PostCategoryRequestBody } from '@/utils/api/server/zod';

const createCatData = async (requestBody: PostCategoryRequestBody, catId: string, image?: File) => {
  if (!catId) {
    return null;
  }

  const response = await apiClient.put(`/v1/categories`, requestBody);
  const parsedCategory = categories.create.parse(response.data.data[0]);

  if (image) {
    const formData = new FormData();
    formData.append('file', image);
    await apiClient.put(`/v1/category/${catId}/images`, formData);
  }

  return parsedCategory;
};

export default createCatData;
