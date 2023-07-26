import apiClient from '@/utils/api/client/apiClient';

const fetchCompaniesCount = async (lastIdPointer = 0) => {
  const response = await apiClient.get(`/v1/companies?lastIdPointer=${lastIdPointer}`);

  const parsedCount = parseInt(response.data.count, 10);

  return parsedCount;
};

export default fetchCompaniesCount;
