import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

const fetchCompany = async (id: string | string[] | undefined) => {
  const response = await apiClient.get(`/v1/companies/${id}`);

  const companyData = companies.getById.parse(response.data.data[0]);

  return companyData;
};

export default fetchCompany;
