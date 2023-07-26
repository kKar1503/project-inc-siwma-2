import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const fetchCategories = async (includeParams = false) => {
  try {
    const response = await apiClient.get(`/v1/categories?includeParameters=${includeParams}`);
    return categories.getAll.parse(response.data.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};

export default fetchCategories;
