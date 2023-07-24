import listing from '@/utils/api/client/zod/listings';
import apiClient from '@/utils/api/client/apiClient';

const fetchProfilesListings = async (
  uuid: string,
  matching?: string,
  sortBy?: string,
  filter?: string
) => {
  let query = `v1/users/${uuid}/listings?includeImages=true&matching=${matching || ''}`;
  if (sortBy) query += `&sortBy=${sortBy}`;
  if (filter === 'BUY' || filter === 'SELL') query += `&type=${filter}`;
  // parse data through zod to ensure data is correct
  const response = await apiClient.get(query);

  const listingData = listing.getAll.parse(response.data.data);
  return listingData;
};

export default fetchProfilesListings;
