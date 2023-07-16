import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';
import { PostCategoryRequestBody } from '@/utils/api/server/zod';

const createCategoryData = async (
  requestBody: PostCategoryRequestBody,
  catId: string,
  categoryImage?: File,
  crossSectionImage?: File
) => {
  if (!catId) {
    return null;
  }

  const response = await apiClient.post(`/v1/categories`, requestBody);
  const createdCategory = categories.create.parse(response.data.data[0]);

  if (categoryImage) {
    const categoryFormData = new FormData();
    categoryFormData.append('file', categoryImage);
    await apiClient.post(`/v1/categories/${catId}/image`, categoryFormData);
  }

  if (crossSectionImage) {
    const crossSectionFormData = new FormData();
    crossSectionFormData.append('file', crossSectionImage);
    await apiClient.post(
      `/v1/categories/${catId}/image`,
      crossSectionFormData
    );
  }

  return createdCategory;
};

export default createCategoryData;
