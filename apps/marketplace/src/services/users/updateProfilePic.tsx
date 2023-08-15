import apiClient from '@/utils/api/client/apiClient';

const updateProfilePic = async (uuid: string, image: File) => {
  if (!uuid) {
    return null;
  }

  const formData = new FormData();
  formData.append('file', image);
  console.log('here');
  const result = await apiClient.put(`/v1/users/${uuid}/images`, formData);
  console.log(result);
  return result;
};

export default updateProfilePic;
