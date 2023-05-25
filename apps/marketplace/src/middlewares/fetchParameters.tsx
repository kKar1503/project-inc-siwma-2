import apiClient from '@/utils/api/client/apiClient';
import parameters from '@/utils/api/client/zod/parameters';

const fetchParameters = async (parameterIDs: string) => {
  const response = await apiClient.get(`/v1/parameters?id=${parameterIDs}`);

  const parsedParams = parameters.getAll.parse(response.data.data);
  return parsedParams;
};

export default fetchParameters;
