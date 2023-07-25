import apiClient from '@/utils/api/client/apiClient';
import parameters from '@/utils/api/client/zod/parameters';

const fetchParameterById = async (id: string | string[] | undefined) => {
  const response = await apiClient.get(`/v1/parameters/${id}`);

  const parameterId = parameters.getById.parse(response.data.data[0]);

  return parameterId;
};

export default fetchParameterById;