import apiClient from '@/utils/api/client/apiClient';

const fetchUser = async (uuid: string) => {
  const res = await apiClient.get(`/v1/users/${uuid}`);
  return {
    data: res.data,
  };
};

export default fetchUser;
