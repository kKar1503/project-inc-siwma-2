import listing from '@/utils/api/client/zod/listings';
import apiClient from '@/utils/api/client/apiClient';

const fetchListing = async (uuid: string, matching?: string, filter?: string) => {
  let query = `v1/users/${uuid}/listings?matching=${matching || ''}`;
  if (filter) query += `&sortBy=${filter}`;
  // parse data through zod to ensure data is correct
  const response = await apiClient.get(query);

  const listingData = listing.getAll.parse(response.data.data);
  return listingData;
};

export default fetchListing;
