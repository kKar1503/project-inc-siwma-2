// import apiClient from '@/utils/api/client/apiClient';
// import advertisement from '@/utils/api/client/zod/advertisements';

// const createdAdvertisementData = async (
//   active: string,
//   startDate: string,
//   endDate: string,
//   description: string,
//   link: string,
//   companyId?: string,
//   image?: File
// ) => {
//   const response = await apiClient.post(`/v1/advertisement`, {
//     active,
//     startDate,
//     endDate,
//     description,
//     link,
//     companyId,
//     image,
//   });

//   console.log({ response });
//   const createdAdvertisement = advertisement.create.parse(response.data.data[0]);

//   return createdAdvertisement;
// };

// export default createdAdvertisementData;

import apiClient from '@/utils/api/client/apiClient';
import advertisement from '@/utils/api/client/zod/advertisements';

const createdAdvertisementData = async (
  active: string,
  startDate: string,
  endDate: string,
  description: string,
  link: string,
  companyId?: string,
  image?: File
) => {
  const formData = new FormData();
  formData.append('active', active);
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);
  formData.append('description', description);
  formData.append('link', link);
  if (companyId) formData.append('companyId', companyId);
  if (image) formData.append('image', image);

  const response = await apiClient.post(`/v1/advertisement`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log({ response });
  const createdAdvertisement = advertisement.create.parse(response.data.data[0]);

  return createdAdvertisement;
};

export default createdAdvertisementData;
