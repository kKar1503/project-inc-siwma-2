import apiClient from '@/utils/api/client/apiClient';
import { ForgetPasswordQueryParameter } from '@/utils/api/server/zod/users';

const forgetPW = async (forgetPWBody: ForgetPasswordQueryParameter | undefined) => {
  if (forgetPWBody === undefined) return false;
  await apiClient.post('/v1/forget-password', forgetPWBody);
  return true;
};

export default forgetPW;
