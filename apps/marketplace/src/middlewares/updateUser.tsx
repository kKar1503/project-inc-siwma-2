import apiClient from '@/utils/api/client/apiClient';

const updateUser = async (
  uuid: string,
  name: string,
  email: string,
  // profilePicture: string | null,
  contact: string,
  whatsappNumber: string,
  telegramUsername : string,
  bio: string,
) => {
  if (uuid) {
    const res = await apiClient.put(`/v1/users/${uuid}`, {
      name,
      email,
      // profilePicture,
      contact,
      whatsappNumber,
      telegramUsername,
      bio,
    });

    return {
      data: res?.data,
    };
  }

  return null;
};

export default updateUser;
