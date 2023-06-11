import apiClient from '@/utils/api/client/apiClient';

// const forgetPW = async (forgetPWBody: ForgetPasswordQueryParameter | undefined) => {
//   if (forgetPWBody === undefined) return false;
//   await apiClient.post('/v1/forget-password', forgetPWBody);
//   return true;
// };

// export default forgetPW;

const forgetPW = async (email: string, token: string) => {
  const newUser = {
    'token': token,
    'email': email,
  };
  const data = await apiClient.post('/v1/users', newUser);
  return data.status;
};
export default forgetPW;
