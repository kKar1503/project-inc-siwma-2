import listings from '@/utils/api/client/zod/listings';
import apiClient from '@/utils/api/client/apiClient';

const deleteListing = async (listingId: string) => {
  const response = await apiClient.delete(`/v1/listings/${listingId}`);
  // const responseData = listings.delete.parse(response.data);
  return response;
};

export default deleteListing;
