import apiClient from '@/utils/api/client/apiClient';

const createUser = async (token: string, phone: string, password: string) => {
  const userBody = {
    token,
    mobileNumber: phone,
    password,
  };
  const data = await apiClient.post('/v1/users', userBody);
  return data.status;
};
export default createUser;
