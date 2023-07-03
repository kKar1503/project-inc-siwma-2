import apiClient from '@/utils/api/client/apiClient';

const bookmarkListing = async (listingID: string) => {
  const response = await apiClient.patch(`/v1/listings/${listingID}/bookmark`);

  return response.data;
};

export default bookmarkListing;
