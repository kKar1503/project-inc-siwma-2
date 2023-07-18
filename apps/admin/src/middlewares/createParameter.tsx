import apiClient from '@/utils/api/client/apiClient';
import parameters, { ParameterResponseBody } from '@/utils/api/client/zod/parameters';

const createParameter = async (requestBody: ParameterResponseBody) => {
  const response = await apiClient.post('v1/parameters/', requestBody);
  const newParam = response.data.data;

  return newParam;
};

export default createParameter;
