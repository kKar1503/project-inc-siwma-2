import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

const fetchCompany = async (companyID: string) => {
  const response = await apiClient.get(`/v1/companies/${companyID}`);

  const parsedCompany = companies.getById.parse(response.data.data[0]);

  return parsedCompany;
};

export default fetchCompany;
