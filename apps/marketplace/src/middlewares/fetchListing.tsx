import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

<<<<<<< HEAD
const fetchListing = async (listingID: string, includeImages = false) => {
  const response = await apiClient.get(`/v1/listings/${listingID}?includeImages=${includeImages}`);

=======
const fetchListing = async (listingID: string) => {
  const response = await apiClient.get(`/v1/listings/${listingID}/?includeImages=true`);
>>>>>>> c788b5d148a873669674a4ffaebc4fed57e7d0b2
  const parsedListing = listings.getById.parse(response.data.data[0]);

  return parsedListing;
};

export default fetchListing;
