import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const updateCatData = async (
  requestBody: { name: string; description: string },
  catId: string,
  image?: File
) => {
  if (!catId) {
    return null;
  }

  const response = await apiClient.put(`/v1/categories/${catId}`, requestBody);
  const parsedCategory = categories.update.parse(response.data.data[0]);

  if (image) {
    const formData = new FormData();
    formData.append('file', image);
    await apiClient.put(`/v1/categories/${catId}/images`, formData);
  }

  return parsedCategory;
};


export default updateCatData;
