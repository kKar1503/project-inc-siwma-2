// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import users from '@/utils/api/client/zod/users';

/**
 * Fetch data from hashed share link
 */
const useShareFunc = (hash: string) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/share/${hash}`)
        // parse data through zod to ensure data is correct
        .then((res) => users.shareListings.parse(res.data.data[0])),
    queryKey: ['getShareData', hash],
    enabled: !!hash,
  });

export default useShareFunc;
