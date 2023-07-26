import apiClient from '@/utils/api/client/apiClient';
import advertisements, { Advertisment } from '@/utils/api/client/zod/advertisements';

const fetchAdvertisements = async (id?: string | string[]): Promise<Advertisment[]> => {
  if (!id) {
    const response = await apiClient.get(`/v1/advertisements`);
    return advertisements.getAll.parse(response.data.data);
  }

  const ids = Array.isArray(id) ? id : [id];
  return Promise.all(ids.map(async (id) => {
    const response = await apiClient.get(`/v1/advertisements/${id}`);
    return advertisements.getById.parse(response.data.data[0]);
  }));
};

export default fetchAdvertisements;
