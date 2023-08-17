// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import parameters from '@/utils/api/client/zod/parameters';

const useFetchParamNames = (paramIds?: string[]) => {
  let query = `v1/parameters`;
  if (paramIds) {
    query = `v1/parameters?id=${paramIds.join(',')}`;
  }
  const { data, error, isError, isFetched } = useQuery({
    queryFn: async () =>
      apiClient
        .get(query)
        // parse data through zod to ensure data is correct
        .then((res) => parameters.getAll.parse(res.data.data)),
    queryKey: ['useFetchListing', paramIds],
    enabled: !!paramIds,
  });

  return {
    data,
    error,
    isError,
    isFetched,
  };
};

export default useFetchParamNames;
