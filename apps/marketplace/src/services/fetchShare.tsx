import apiClient from '@/utils/api/client/apiClient';

const fetchShare = async (listingId: string) => {
  const response = await apiClient.post(`/v1/listings/${listingId}/shorten-url`);

  return response.data.data[0];
};

export default fetchShare;
