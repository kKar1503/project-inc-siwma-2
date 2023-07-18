import apiClient from '@/utils/api/client/apiClient';
import parameters, { Parameter } from '@/utils/api/client/zod/parameters';

const fetchParameters = async () => {
  const response = await apiClient.get(`/v1/parameters`);
  const parsedParams = parameters.getAll.parse(response.data.data);
  const hashMap: Record<string, Parameter> = {};
  parsedParams.forEach((param) => {
    hashMap[param.id] = param;
  });
  return hashMap;
};

export default fetchParameters;