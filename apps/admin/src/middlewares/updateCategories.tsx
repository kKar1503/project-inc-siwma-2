import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const updateCategoryData = async (
  requestBody: { name: string; description: string },
  catId: string,
  categoryImage?: File,
  crossSectionImage?: File
) => {
  if (!catId) {
    return null;
  }

  const response = await apiClient.put(`/v1/categories/${catId}`, requestBody);
  const parsedCategory = categories.update.parse(response.data.data[0]);
  
  if (categoryImage) {
    const categoryFormData = new FormData();
    categoryFormData.append('file', categoryImage);
    await apiClient.put(`/v1/categories/${catId}/image`, categoryFormData);
  }

  if (crossSectionImage) {
    const crossSectionFormData = new FormData();
    crossSectionFormData.append('file', crossSectionImage);
    await apiClient.put(`/v1/categories/${catId}/cross-section-image`, crossSectionFormData);
  }


  return parsedCategory;
};


export default updateCategoryData;
