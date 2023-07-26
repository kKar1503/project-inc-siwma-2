import apiClient from '@/utils/api/client/apiClient';
import parameters, { ParameterResponseBody } from '@/utils/api/client/zod/parameters';

const updateParameter = async (requestBody: ParameterResponseBody, id: string) => {
  if (!id) {
    return null;
  }

  const response = await apiClient.put(`/v1/parameters/${id}`, requestBody);
  const parsedParameter = parameters.update.parse(response.data.data[0]);

  return parsedParameter;
};

export default updateParameter;