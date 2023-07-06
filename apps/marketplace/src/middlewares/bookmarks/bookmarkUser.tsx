import apiClient from '@/utils/api/client/apiClient';

const bookmarkUser = async (uuid: string) => {
  const response = await apiClient.patch(`/v1/users/${uuid}/bookmark`);

  return response.data;
};

export default bookmarkUser;
