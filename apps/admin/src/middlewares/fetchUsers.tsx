import apiClient from '@/utils/api/client/apiClient';
import users from '@/utils/api/client/zod/users';

const fetchUsers = async () => {
  const response = await apiClient.get(`/v1/users/`);
  const parsedUsers = users.getAll.parse(response.data.data);

  return parsedUsers;
};

export default fetchUsers;
