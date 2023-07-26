import apiClient from '@/utils/api/client/apiClient';
import parameters from '@/utils/api/client/zod/parameters';

const fetchParams = async (ids?: string[]) => {
  // Construct the params
  const params = {
    id: ids?.join(','),
  };

  // Perform the request
  const response = await apiClient.get(`/v1/parameters`, {
    params,
  });

  // parse data through zod to ensure data is correct
  const paramData = parameters.getAll.parse(response.data.data);
  return paramData;
};

export default fetchParams;
