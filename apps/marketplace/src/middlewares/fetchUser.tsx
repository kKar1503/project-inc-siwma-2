import apiClient from '@/utils/api/client/apiClient';
import type { UserResponseBody } from '@/utils/api/client/zod/users';

const fetchUser = async (uuid: string) => {
  if (uuid) {
    const response = await apiClient.get(`/v1/users/${uuid}`);
    // parse data through zod to ensure data is correct
    const parsedUser = response.data.data[0] as UserResponseBody;
    return parsedUser;
  }

  return null;
};

export default fetchUser;
