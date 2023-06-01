import categories from '@/utils/api/client/zod/categories';
import apiClient from '@/utils/api/client/apiClient';

const fetchCat = async (catData: []) => {

    const response = await apiClient.get(`/v1/categories/`);
    if (response) {
      console.log(response.data.data);
    }
    const parsedCategories = categories.getAll.parse(response.data.data);
    return parsedCategories;
  };

  export default fetchCat