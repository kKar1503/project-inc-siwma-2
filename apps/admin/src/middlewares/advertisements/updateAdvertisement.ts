import apiClient from '@/utils/api/client/apiClient';
import advertisements, { Advertisment } from '@/utils/api/client/zod/advertisements';

export type PutCompanyRequestBody = {
  name: string;
  website: string;
  bio: string | null;
};

const updateBody = async (data: PutCompanyRequestBody, id: string): Promise<Advertisment> => {
  const response = await apiClient.put(`/v1/advertisements/${id}`, data);
  return advertisements.update.parse(response.data.data[0]);
};

export const updateImage = async (image: File, id: string): Promise<Advertisment> => {
  const formData = new FormData();
  formData.append('file', image);
  const response = await apiClient.put(`/v1/advertisements/${id}/images`, formData);
  return advertisements.update.parse(response.data.data[0]);
};

const updateAdvertisement = async (id: string, data: PutCompanyRequestBody | undefined, image: File | undefined) => {
  if (!id) {
    return null;
  }

  const [response1, response2] = await Promise.all(
    [
      data && updateBody(data, id),
      image && updateImage(image, id),
    ]);
  if (!response1) return response2;
  if (!response2) return response1;
  response1.image = response2.image;
  return response1;
};


export default updateAdvertisement;
