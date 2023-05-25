import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const fetchCategories = async () => {
  const response = await apiClient.get(`/v1/categories?includeParameters=${true}`);

  const parsedCategories = categories.getAll.parse(response.data.data);
  return parsedCategories;
};

export default fetchCategories;
