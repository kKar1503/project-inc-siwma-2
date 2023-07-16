// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

/**
 * Toggles the bookmarking of a user
 */
const useBookmarkUser = (uuid: string) =>
  useQuery({
    queryFn: async () =>
      apiClient.patch(`/v1/users/${uuid}/bookmark`).then((res) => {
        console.log(res.data);
        return res.data.data.bookmarked as boolean;
      }),
    enabled: false,
  });

export default useBookmarkUser;
