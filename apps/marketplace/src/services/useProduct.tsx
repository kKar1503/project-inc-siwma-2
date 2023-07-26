// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import products from '@/utils/api/client/zod/products';

/**
 * Fetch a full product data
 */
const useProduct = (productID: string) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/products/${productID}`)
        // parse data through zod to ensure data is correct
        .then((res) => products.getById.parse(res.data.data[0])),
    queryKey: ['useProduct', productID],
    enabled: !!productID,
  });

export default useProduct;
