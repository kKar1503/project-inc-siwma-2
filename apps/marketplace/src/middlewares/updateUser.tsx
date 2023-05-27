import apiClient from '@/utils/api/client/apiClient';

const updateUser = async (uuid: string) => {
  if (uuid) {
    const res = await apiClient.put(`/v1/users/${uuid}`);
    return {
      data: res?.data,
    };
  }

  return null;
};

export default updateUser;