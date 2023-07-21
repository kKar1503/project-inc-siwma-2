import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

const fetchPopularListings = async () => {
  const response = await apiClient.get(
    `/v1/listings?limit=13&sortBy=highest_rating&includeImages=true`
  );

  // parse data through zod to ensure that data is correct
  const listingsData = listings.getAll.parse(response.data.data[0].listings);

  return listingsData;
};

export default fetchPopularListings;
