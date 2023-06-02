import apiClient from '@/utils/api/client/apiClient';
import parameters from '@/utils/api/client/zod/parameters';

const fetchParams = async () => {
  const response = await apiClient.get(`v1/parameters/types`);
  // parse data through zod to ensure data is correct
  const paramData = parameters.getTypes.parse(response.data.data);
  return paramData;
};

export default fetchParams;