import apiClient from '@/utils/api/client/apiClient';
import users from '@/utils/api/client/zod/users';
import { PutUserRequestBody } from '@/utils/api/server/zod';

const editUser = async (requestBody: PutUserRequestBody, uuid: string, image?: File) => {
  if (!uuid) {
    return null;
  }

  const response = await apiClient.put(`/v1/users/${uuid}`, requestBody);
  const parsedUser = users.update.parse(response.data.data[0]);

  if (image) {
    const formData = new FormData();
    formData.append('file', image);
    await apiClient.put(`/v1/users/${uuid}/images`, formData);
  }

  return parsedUser;
};

export default editUser;
