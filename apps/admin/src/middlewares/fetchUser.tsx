import apiClient from '@/utils/api/client/apiClient';
import users from '@/utils/api/client/zod/users';

const fetchUser = async (uuid: string) => {
  const response = await apiClient.get(`/v1/users/${uuid}`);
  // parse data through zod to ensure data is correct
  const parsedUser = users.getById.parse(response.data.data[0]);

  return parsedUser;
};

export default fetchUser;
