import apiClient from '@/utils/api/client/apiClient'


const fetchCategories = async () => {
  const response = await apiClient.get(`/v1/categories`);

  return response.data.data
}

export default fetchCategories