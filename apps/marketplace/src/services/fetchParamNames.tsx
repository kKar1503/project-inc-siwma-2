import apiClient from '@/utils/api/client/apiClient';
import parameters from '@/utils/api/client/zod/parameters';

const fetchParams = async (paramIds?: string[]) => {
  let query = `v1/parameters`;
  if (paramIds) {
    query = `v1/parameters?id=${paramIds.join(',')}`;
  }
  const response = await apiClient.get(query);
  // parse data through zod to ensure data is correct
  const paramData = parameters.getAll.parse(response.data.data);
  return paramData;
};

export default fetchParams;
