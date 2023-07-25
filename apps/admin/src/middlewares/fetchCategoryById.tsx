import categories from '@/utils/api/client/zod/categories';
import apiClient from '@/utils/api/client/apiClient';

const fetchCategoryById = async (catId: string | string[] | undefined) => {
  try {
    const response = await apiClient.get(`/v1/categories/${catId}`);
    const catData = categories.getById.parse(response.data.data[0]);
    return catData;
  } catch (error) {
    console.error('Error fetching category by id:', error);
    throw new Error('Failed to fetch category by id. Please try again later.');
  }
};

export default fetchCategoryById;
