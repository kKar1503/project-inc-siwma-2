import apiClient from '@/utils/api/client/apiClient';
import categories, { CategoryResponseBody } from '@/utils/api/client/zod/categories';

const fetchCategories = async (includeParams = false) : Promise<CategoryResponseBody[]> => {
  const response = await apiClient.get(`/v1/categories?includeParameters=${includeParams}`);
  return categories.getAll.parse(response.data.data);
};

export default fetchCategories;
