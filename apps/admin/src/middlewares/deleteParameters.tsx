import apiClient from '@/utils/api/client/apiClient';

const deleteParameters = async (id: string) => {
  const response = await apiClient.delete(`/v1/parameters/${id}`);
  return response.data;
};

export default deleteParameters;