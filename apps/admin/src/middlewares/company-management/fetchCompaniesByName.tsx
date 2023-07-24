import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

const fetchCompaniesByName = async (name?: string) => {
  const response = await apiClient.get(`/v1/companies?name=${name}`);

  const parsedCompanies = companies.getAll.parse(response.data.data);

  return {
    data: parsedCompanies,
    count: response.data.count,
  };
};

export default fetchCompaniesByName;
