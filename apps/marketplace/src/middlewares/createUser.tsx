import apiClient from '@/utils/api/client/apiClient';

const createUser = async (
  company: string,
  email: string,
  password: string,
  userName: string,
  phone: string,
  token: string
) => {
  const userBody = {
    'token': token,
    'company': company,
    'email': email,
    'password': password,
    'name': userName,
    'mobileNumber': phone,
  };
  const data = await apiClient.post('/v1/users', userBody);
  return data.status;
};
export default createUser;
