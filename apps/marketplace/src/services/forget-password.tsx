import apiClient from '@/utils/api/client/apiClient';

const forgetPW = async (email: string) => {
  const forgetPWBody = {
    email,
  };
  const data = await apiClient.post('/v1/forget-password', forgetPWBody);
  return data.status;
};
export default forgetPW;
