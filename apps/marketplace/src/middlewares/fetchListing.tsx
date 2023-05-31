import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

const fetchListings = async (listingID: string) => {
  const response = await apiClient.get(`/v1/listing/${listingID}`);

  const parsedListings = listings.getAll.parse(response.data.data);
  return parsedListings;
};

export default fetchListings;