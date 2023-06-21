import apiClient from '@/utils/api/client/apiClient';
import users from '@/utils/api/client/zod/users';
import { PutUserRequestBody } from '@/utils/api/server/zod';

const updateUser = async (requestBody: PutUserRequestBody, uuid: string) => {
  if (uuid) {
    const response = await apiClient.put(`/v1/users/${uuid}`, requestBody);
    const parsedUser = users.update.parse(response.data.data[0]);
    return parsedUser;
  }

  return null;
};

// const updateUser = async (
//   uuid: string,
//   name: string,
//   email: string,
//   // profilePicture: string,
//   mobileNumber: string,
//   contactMethod: string,
//   whatsappNumber: string,
//   telegramUsername: string,
//   bio: string
// ) => {
//   if (uuid) {
//     const response = await apiClient.put(`/v1/users/${uuid}`, {
//       // requestBody,
//       name,
//       email,
//       // profilePicture,
//       mobileNumber,
//       contactMethod,
//       whatsappNumber,
//       telegramUsername,
//       bio,
//     });
//     const parsedUser = users.update.parse(response.data.data[0]);
//     return parsedUser;
//   }

//   return null;
// };

export default updateUser;