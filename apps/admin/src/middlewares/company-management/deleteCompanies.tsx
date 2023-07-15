import apiClient from '@/utils/api/client/apiClient';

const deleteCompanies = async (id: string) => {
  const response = await apiClient.delete(`/v1/companies/${id}`);

  return response.data;
};

export default deleteCompanies;
