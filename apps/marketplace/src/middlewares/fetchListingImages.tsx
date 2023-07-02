import apiClient from '@/utils/api/client/apiClient';
import listing from '@/utils/api/client/zod/listings';

const fetchListingImages = async (listingID: string) => {
  const response = await apiClient.get(`v1/listings/${listingID}/images/`);
  const listingImages = listing.getImages.parse(response.data.data);
  return listingImages;
};

export default fetchListingImages;
