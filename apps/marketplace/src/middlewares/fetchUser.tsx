import apiClient from '@inc/api/api/client/apiClient';
import users from '@inc/api/api/client/zod/users';

const fetchUser = async (uuid: string) => {
  if (uuid) {
    const response = await apiClient.get(`/v1/users/${uuid}`);
    // parse data through zod to ensure data is correct
    const parsedUser = users.getById.parse(response.data.data[0]);
    return parsedUser;
  }

  return null;
};

export default fetchUser;
