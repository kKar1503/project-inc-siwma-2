// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import { productsSchema } from '@/utils/api/server/zod/listingTablesProducts';

/**
 * Fetch products data for zustand store
 */
const useProducts = (productIds: string[]) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/listings/table/products`, {
          params: {
            id: productIds.join(','),
          },
        })
        // parse data through zod to ensure data is correct
        .then((res) => productsSchema.parse(res.data.data)),
    queryKey: ['products', productIds],
    enabled: productIds.length !== 0,
  });

export default useProducts;
