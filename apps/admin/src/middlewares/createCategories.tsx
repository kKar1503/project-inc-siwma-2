import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const createCategoryData = async (
  name: string,
  description: string,
  image?: File,
  crossSectionImage?: File,
  parameters?: { parameterId: number; required: boolean }[]

) => {

  const response = await apiClient.post(`/v1/categories`, {
    name,
    description,
    image,
    crossSectionImage,
    parameters
  });
  const createdCategory = categories.create.parse(response.data.data[0]);

  if (image) {
    const categoryFormData = new FormData();
    categoryFormData.append('file', image);
    await apiClient.post(`/v1/categories/${createdCategory.categoryId}/images`, categoryFormData);
  }

  if (crossSectionImage) {
    const crossSectionFormData = new FormData();
    crossSectionFormData.append('file', crossSectionImage);
    await apiClient.post(`/v1/categories/${createdCategory.categoryId}/cross-section-image`, crossSectionFormData);
  }

  return createdCategory;
};

export default createCategoryData;
