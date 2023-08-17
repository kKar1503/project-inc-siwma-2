// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import categories from '@/utils/api/client/zod/categories';

/**
 * Fetch a full product data
 */
const useFetchCatById = (catId: string | string[] | undefined) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/categories/${catId}?includeParameters=true`)
        // parse data through zod to ensure data is correct
        .then((res) => categories.getById.parse(res.data.data[0])),
    queryKey: ['useFetchCatById', catId],
    enabled: !!catId,
  });

export default useFetchCatById;
