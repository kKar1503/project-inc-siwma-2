import apiClient from '@/utils/api/client/apiClient';
import advertisements from '@/utils/api/client/zod/advertisements';
import { log } from 'console';

const fetchAdvertisements = async (permissions: number) => {
  const response = await apiClient.get(`/v1/advertisements`);
  const currentDate = new Date();

  // parse data through zod to ensure that data is correct
  const advertisementsData = advertisements.getAll.parse(response.data.data);

  console.log(advertisementsData);

  // If user is admin, then you have to check whether the current date is between start and end date and check if active key is true
  if (permissions === 1) {
    const filteredArr = advertisementsData.filter((item) => {
      const startDate = new Date(item.startDate as string);
      const endDate = new Date(item.endDate as string);
      console.log(item);
      console.log(startDate);
      console.log(endDate);
      console.log(currentDate);
      console.log(currentDate >= startDate);
      console.log(currentDate <= endDate);
      return currentDate >= startDate && currentDate <= endDate && item.active;
    });
    console.log(filteredArr);
    return filteredArr;
  }

  return advertisementsData;
};

export default fetchAdvertisements;
