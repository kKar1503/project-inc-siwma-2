// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import parameters from '@/utils/api/client/zod/parameters';

/**
 * Fetch params data for zustand store
 */
const useParameters = (paramIds: string[]) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/parameters`, {
          params: {
            id: paramIds.join(','),
          },
        })
        .then((res) => parameters.getAll.parse(res.data.data)),
    queryKey: ['parameters', paramIds],
    enabled: paramIds.length !== 0,
  });

export default useParameters;
