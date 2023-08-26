import apiClient from '@/utils/api/client/apiClient';
import advertisements from '@/utils/api/client/zod/advertisements';
import { PostAdvertisementRequestBody } from '@/utils/api/server/zod/advertisements';
import { updateImage } from './updateAdvertisement';

const createAdvertisement = async (data: PostAdvertisementRequestBody, image?: File): Promise<{
  advertisementId: string;
}> => {
  const response = await apiClient.post(`v1/advertisements/`, data);
  const advertisement = advertisements.create.parse(response.data.data[0]);
  if (!image) return advertisement;
  await updateImage(image, advertisement.advertisementId);
  return advertisement;
};

export default createAdvertisement;
