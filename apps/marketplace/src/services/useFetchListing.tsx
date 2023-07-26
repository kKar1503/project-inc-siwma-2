// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import listings from '@/utils/api/client/zod/listings';

const useFetchListing = (listingID: string) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/listings/${listingID}?includeParameters=true`)
        // parse data through zod to ensure data is correct
        .then((res) => listings.getById.parse(res.data.data[0])),
    queryKey: ['useFetchListing', listingID],
    enabled: !!listingID,
  });

export default useFetchListing;
