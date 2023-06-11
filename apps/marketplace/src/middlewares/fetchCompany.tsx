import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

const fetchCompany = async (companyid: string) => {
  if (companyid) {
    const response = await apiClient.get(`/v1/companies/${companyid}`);
    const parsedCompany = companies.getById.parse(response.data.data[0]);
    return parsedCompany;    
  }

  return null;
};

export default fetchCompany;
