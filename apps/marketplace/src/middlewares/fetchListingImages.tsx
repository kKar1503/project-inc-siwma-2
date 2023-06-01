import apiClient from '@/utils/api/client/apiClient';
import listing from '@/utils/api/client/zod/listings';

const fetchListingImages = async (listingID: string) => {
  const response = await apiClient.get(`v1/listings/${listingID}/images/`);
  //   console.log(response);
  // parse data through zod to ensure data is correct
  const listingImages = listing.getImages.parse(response.data.data[0]);
  return listingImages;
};

export default fetchListingImages;