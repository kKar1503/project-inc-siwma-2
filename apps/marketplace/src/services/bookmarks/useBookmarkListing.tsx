// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

/**
 * Toggles the bookmarking of a listing
 */
const useBookmarkListing = (listingId: string) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .patch(`/v1/listings/${listingId}/bookmark`)
        .then((res) => res.data.data[0].bookmarked as boolean),
    queryKey: ['bookmarkListing', listingId],
    enabled: false,
  });

export default useBookmarkListing;
