import apiClient from '@/utils/api/client/apiClient';
import advertisements from '@/utils/api/client/zod/advertisements';

const deleteAdvertisement = async (id: string) : Promise<unknown> => {
  const response = await apiClient.delete(`/v1/advertisements/${id}`);
  return advertisements.delete.parse(response.data.data[0]);
};

export default deleteAdvertisement;
