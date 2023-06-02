import apiClient from '@/utils/api/client/apiClient';

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
  console.log('uuid:', uuid);
  console.log('name:', name);
  console.log('email:', email);
  console.log('contact:', contact);
  console.log('mobilenumber:', mobileNumber);
  console.log('whatsappNumber:', whatsappNumber);
  console.log('telegramUsername:', telegramUsername);
  console.log('bio:', bio);

  if (uuid) {
    const res = await apiClient.put(`/v1/users/${uuid}`, {
      name,
      email,
      // profilePicture,
      mobileNumber,
      contact,
      ...(contact === 'whatsapp' && { whatsappNumber }),
      ...(contact === 'telegram' && { telegramUsername }),
      bio,
    });

    return {
      data: res?.data,
    };
  }

  return null;
};

export default updateUser;
