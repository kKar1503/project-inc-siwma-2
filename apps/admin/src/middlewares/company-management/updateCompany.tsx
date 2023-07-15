import apiClient from '@/utils/api/client/apiClient';

const updateCompany = async (id: string, data: any) => {
  const response = await apiClient.put(`/v1/companies/${id}`, data);

  return response.data;
};

export default updateCompany;
