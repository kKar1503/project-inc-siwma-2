import categories from '@/utils/api/client/zod/categories';
import apiClient from '@/utils/api/client/apiClient';

const fetchCatById = async (catId: string | string[] | undefined) => {
  const response = await apiClient.get(`/v1/categories/${catId}`);
  const catData = categories.getById.parse(response.data.data[0]);
  return catData;
};

export default fetchCatById;
