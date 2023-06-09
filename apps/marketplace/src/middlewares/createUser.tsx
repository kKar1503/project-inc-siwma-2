import apiClient from '@/utils/api/client/apiClient';
import { PostUserRequestBody } from '@/utils/api/server/zod/users';

const createUser = async (userBody: PostUserRequestBody | undefined) => {
  if (userBody === undefined) return false;
  await apiClient.post('/v1/users', userBody);
  return true;
};

export default createUser;
