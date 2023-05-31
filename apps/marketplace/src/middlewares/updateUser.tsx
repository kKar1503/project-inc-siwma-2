import apiClient from '@/utils/api/client/apiClient';

const updateUser = async (
  uuid: string,
  name: string,
  email: string,
  // profilePicture: string | null,
  // company: string,
  mobileNumber: string,
  whatsappNumber: string | null,
  telegramUsername: string | null,
  // contactMethod: 'email' | 'whatsapp' | 'telegram' | 'facebook' | 'phone',
  bio: string | null,
  // comments?: string | null | undefined
) => {
  if (uuid) {
    const res = await apiClient.put(`/v1/users/${uuid}`, {
      name,
      email,
      // profilePicture,
      // company,
      mobileNumber,
      whatsappNumber,
      telegramUsername,
      // contactMethod,
      bio,
      // comments,
    });

    return {
      data: res?.data,
    };
  }

  return null;
};

export default updateUser;
