import apiClient from '@/utils/api/client/apiClient';
import users from '@/utils/api/client/zod/users';

const fetchUsers = async (userID: string) => {
  const response = await apiClient.get(`v1/users/${userID}`);
  // parse data through zod to ensure data is correct
  const userData = users.getById.parse(response.data.data[0]);
  console.log(userData)
  return userData;
};

export default fetchUsers;