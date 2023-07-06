import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

const fetchCompany = async (uuid: string | undefined) => {
  const companyResponse = await apiClient.get(`/v1/companies/${uuid}`);
  const parsedCompany = companies.getById.parse(companyResponse.data.data[0]);
  return parsedCompany;
};
export default fetchCompany;
