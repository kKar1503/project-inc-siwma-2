import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const fetchCat = async () => {
  const response = await apiClient.get(`v1/categories/`);
  // parse data through zod to ensure data is correct
  const catData = categories.getAll.parse(response.data.data);
  return catData;
};

export default fetchCat;