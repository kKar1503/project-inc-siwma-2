import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';

const fetchCat = async (catID: number) => {
  const response = await apiClient.get(`v1/categories/${catID}`);
  // parse data through zod to ensure data is correct
  const catData = categories.getById.parse(response.data.data[0]);
  return catData;
};

export default fetchCat;