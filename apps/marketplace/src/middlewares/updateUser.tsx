import apiClient from '@/utils/api/client/apiClient';
import users from '@/utils/api/client/zod/users';

const updateUser = async (
  uuid: string,
  name: string,
  email: string,
  // profilePicture: string,
  mobileNumber: string,
  contact: string,
  whatsappNumber: string,
  telegramUsername: string,
  bio: string
) => {
  if (uuid) {
    const response = await apiClient.put(`/v1/users/${uuid}`, {
      name,
      email,
      // profilePicture,
      mobileNumber,
      contact,
      whatsappNumber,
      telegramUsername,
      bio,
    });
    const parsedUser = users.update.parse(response.data.data[0]);
    return parsedUser;  
  }

  return null;
};

export default updateUser;
