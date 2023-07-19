import apiClient from '@/utils/api/client/apiClient';
import companies, { CompanyResponseBody } from '@/utils/api/client/zod/companies';

const fetchCompanies = async (): Promise<CompanyResponseBody[]> => {
  const response = await apiClient.get(`/v1/companies`);
  return companies.getAll.parse(response.data.data);
};
export default fetchCompanies;
