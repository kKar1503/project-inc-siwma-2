// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import users from '@/utils/api/client/zod/users';

/**
 * Fetch a full user data
 */
const useUser = (uuid: string) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/users/${uuid}`)
        // parse data through zod to ensure data is correct
        .then((res) => users.getById.parse(res.data.data[0])),
    queryKey: ['user', uuid],
    enabled: !!uuid,
  });

export default useUser;
