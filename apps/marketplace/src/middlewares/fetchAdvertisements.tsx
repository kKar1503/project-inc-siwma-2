import apiClient from '@/utils/api/client/apiClient';
import advertisements from '@/utils/api/client/zod/advertisements';

const fetchAdvertisements = async () => {
  const response = await apiClient.get(`/v1/advertisements`);

  console.log(response)

  // parse data through zod to ensure that data is correct
  const advertisementsData = advertisements.getAll.parse(response.data.data);

  console.log(advertisementsData)

  return advertisementsData;
};

export default fetchAdvertisements;