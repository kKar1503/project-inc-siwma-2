// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Zod Imports
import users from '@/utils/api/client/zod/users';

// ** Types Imports
import type { User } from '@/utils/api/client/zod/users';

const fetchSingleUser = (uuid: string) =>
  apiClient
    .get(`/v1/users/${uuid}`)
    // parse data through zod to ensure data is correct
    .then((res) => users.getById.parse(res.data.data[0]));

/**
 * Fetch a full user data
 */
const useMultipleUsers = (uuids: string[]) =>
  useQuery({
    queryFn: async () => {
      const multipleUsersFetch = uuids.map((uuid) => fetchSingleUser(uuid));
      return Promise.allSettled(multipleUsersFetch).then((values) => {
        const usersArray: User[] = [];
        values.forEach((v) => {
          if (v.status === 'fulfilled') {
            usersArray.push(v.value);
          }
        });
        return usersArray;
      });
    },
    queryKey: ['users', uuids],
    enabled: !!uuids && uuids.length !== 0,
  });

export default useMultipleUsers;
