import apiClient from '@/utils/api/client/apiClient';

const fetchListing = async (id: string) => {
  if (id) {
    const res = await apiClient.get(`/v1/listing/${id}`);
    return {
      data: res?.data,
    };
  }

  return null;
};

export default fetchListing;