// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

/**
 * Creates a share link for selected listings
 */
const useShareListings = (ownerId: string, listings: string[]) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .post(`/v1/share`, {
          ownerId,
          listings,
        })
        // parse data through zod to ensure data is correct
        .then((res) => res.data.data[0].hash as string),
    enabled: false,
  });

export default useShareListings;
