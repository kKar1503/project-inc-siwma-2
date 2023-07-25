import apiClient from '@/utils/api/client/apiClient';
import { useQuery } from 'react-query';
import parameters, { Parameter } from '@/utils/api/client/zod/parameters';

const fetchParameters = async () => {
  const response = await apiClient.get(`/v1/parameters`);
  const parsedParams = parameters.getAll.parse(response.data.data);
  return parsedParams;
};

export default fetchParameters;
