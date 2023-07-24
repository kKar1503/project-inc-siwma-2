// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import {
  TSortableDirection,
  TSortableField,
  listingTableResponseSchema,
} from '@/utils/api/server/zod/listingTable';

/**
 * Fetch paginated listings data for listing table
 */
const useListings = (
  limit: number,
  page: number,
  options: {
    categoryId?: string;
    sortBy?: TSortableField;
    sortDirection?: TSortableDirection;
  } = {}
) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/listings/table`, {
          params: {
            limit,
            page,
            ...options,
          },
        })
        // parse data through zod to ensure data is correct
        .then((res) => listingTableResponseSchema.parse(res.data.data[0])),
    queryKey: [
      'listingTable',
      limit,
      page,
      options.categoryId,
      options.sortBy,
      options.sortDirection,
    ],
  });

export default useListings;
