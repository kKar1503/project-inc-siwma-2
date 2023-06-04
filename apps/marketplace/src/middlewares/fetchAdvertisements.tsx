import apiClient from '@/utils/api/client/apiClient';
import advertisements from '@/utils/api/client/zod/advertisements';

const fetchAdvertisements = async (permissions: number) => {
  const response = await apiClient.get(`/v1/advertisements`);
  const currentDate = new Date();

  // parse data through zod to ensure that data is correct
  const advertisementsData = advertisements.getAll.parse(response.data.data);

  // If user is admin, then you have to check whether the current date is between start and end date and check if active key is true
  // if (permissions === 1) {
  //   const filteredArr = advertisementsData.filter((item) => {
  //     const startDate = new Date(item.startDate as string)
  //     const endDate = new Date(item.endDate as string)

  //     return currentDate >= startDate && currentDate <= endDate && item.active;
  //   })
  //   return filteredArr;
  // }
  advertisementsData.forEach((item) => {
    item.image = "https://pbs.twimg.com/profile_images/1546442267149225984/gcEhSyAV_400x400.jpg"
  })

  return advertisementsData;
};

export default fetchAdvertisements;
