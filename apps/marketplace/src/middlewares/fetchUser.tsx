import apiClient from '@/utils/api/client/apiClient';
import users from '@/utils/api/client/zod/users';

const fetchUsers = async () => {
  const response = await apiClient.get(`/v1/users/`);
  // parse data through zod to ensure data is correct
  const user = users.getAll.parse(response.data.data);
  return user;
};

export default fetchUsers;
