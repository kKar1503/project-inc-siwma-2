import apiClient from '@/utils/api/client/apiClient';

const fetchUser = async (uuid: string) => {
  if (uuid) {
    const res = await apiClient.get(`/v1/users/${uuid}`);
    return {
      data: res?.data,
    };
  }

  return null;
};

export default fetchUser;
