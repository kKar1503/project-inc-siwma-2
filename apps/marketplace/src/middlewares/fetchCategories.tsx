import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const fetchCategories = async () => {
  const response = await apiClient.get(`/v1/categories?includeParameters=${true}`);

  // currently functionality for img url is not complete under backend, therefore this is commented out.
  const parsedCategories = categories.getAll.parse(response.data.data);

  return parsedCategories;
};

export default fetchCategories;
