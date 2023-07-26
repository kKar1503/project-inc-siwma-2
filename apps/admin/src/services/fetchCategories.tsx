import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const fetchCategories = async (includeParams = false) => {
  const response = await apiClient.get(`/v1/categories?includeParameters=${includeParams}`);
  return categories.getAll.parse(response.data.data);
};

export default fetchCategories;