import listing from '@/utils/api/client/zod/listings';
import apiClient from '@/utils/api/client/apiClient';

export type SortingOptions =
  | 'recent_newest'
  | 'recent_oldest'
  | 'price_desc'
  | 'price_asc'

export type FilterOptions = {
  sortBy?: SortingOptions;
};

const fetchListing = async (uuid: string, matching?: string, filter?: FilterOptions) => {
  let query = `v1/users/${uuid}/listings?matching=${matching || ''}`;
  if (filter?.sortBy) query += `&sortBy=${filter.sortBy}`;
  // parse data through zod to ensure data is correct
  const response = await apiClient.get(query);
  console.log(query)

  const listingData = listing.getAll.parse(response.data.data);
  return listingData;
};

export default fetchListing;
