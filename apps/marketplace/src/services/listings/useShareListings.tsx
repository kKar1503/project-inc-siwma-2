// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

/**
 * Creates a share link for selected listings
 */
const useListings = (ownerId: string, listings: string[]) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .post(`/v1/share`, {
          ownerId,
          listings,
        })
        // parse data through zod to ensure data is correct
        .then((res) => res.data.data[0].hash as string),
    queryKey: ['shareListing', ownerId, listings],
    enabled: false,
  });

export default useListings;
