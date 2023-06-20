import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const fetchCategories = async () => {
  const response = await apiClient.get(`/v1/categories`);

  // parse data through zod to ensure that data is correct
  const categoriesData = categories.getAll.parse(response.data.data);

  return categoriesData;
};

export default fetchCategories;
