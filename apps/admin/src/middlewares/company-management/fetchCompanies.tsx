import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

const fetchCompanies = async () => {
  const response = await apiClient.get(`/v1/companies`);

  const parsedCompanies = companies.getAll.parse(response.data.data);

  return parsedCompanies;
};

export default fetchCompanies;
