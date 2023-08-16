import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const updateCategoryData = async (
  requestBody: { name: string; description: string },
  catId: string,
  categoryImage?: File,
  crossSectionImage?: File
) => {
  try {
    if (!catId) {
      return null;
    }

    const response = await apiClient.put(`/v1/categories/${catId}`, requestBody);
    const parsedCategory = categories.update.parse(response.data.data[0]);

    if (categoryImage) {
      const categoryFormData = new FormData();
      categoryFormData.append('file', categoryImage);
      await apiClient.put(`/v1/categories/${catId}/images`, categoryFormData);
    }

    if (crossSectionImage) {
      const crossSectionFormData = new FormData();
      crossSectionFormData.append('file', crossSectionImage);
      await apiClient.put(`/v1/categories/${catId}/crossSectionImages`, crossSectionFormData);
    }

    return parsedCategory;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category. Please try again later.');
  }
};

export default updateCategoryData;
