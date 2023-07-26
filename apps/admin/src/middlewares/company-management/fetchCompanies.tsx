import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

const fetchCompanies = async (lastIdPointer = 0, limit = 5) => {
  const response = await apiClient.get(
    `/v1/companies?lastIdPointer=${lastIdPointer}&limit=${limit}`
  );

  const parsedCompanies = companies.getAll.parse(response.data.data);

  return parsedCompanies;
};

export default fetchCompanies;
