import categories from '@/utils/api/client/zod/categories';
import apiClient from '@/utils/api/client/apiClient';

const fetchCats = async () => {
  const response = await apiClient.get(`/v1/categories/`);
  const catData = categories.getAll.parse(response.data.data);
  return catData;
};

export default fetchCats;
