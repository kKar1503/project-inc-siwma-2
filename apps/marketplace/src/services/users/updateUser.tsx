import apiClient from '@/utils/api/client/apiClient';
import users from '@/utils/api/client/zod/users';
import { PutUserRequestBody } from '@/utils/api/server/zod';

const updateUser = async (requestBody: PutUserRequestBody, uuid: string) => {
  if (!uuid) {
    return null;
  }

  const response = await apiClient.put(`/v1/users/${uuid}`, requestBody);
  const parsedUser = users.update.parse(response.data.data[0]);

  return parsedUser;
};

export default updateUser;
