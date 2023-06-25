import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

export type SortingOptions =
  | 'recent_newest'
  | 'recent_oldest'
  | 'price_desc'
  | 'price_asc'
  | 'rating_desc'
  | 'rating_asc'
  | 'popularity_desc'
  | 'popularity_asc';

export type FilterOptions = {
  sortBy?: SortingOptions;
  category?: number;
  negotiable?: boolean;
  minPrice?: number;
  maxPrice?: number;
};

const searchListings = async (matching?: string, filter?: FilterOptions) => {
  let query = `/v1/listings?matching=${matching}`;
  if (filter?.sortBy) query += `&sortBy=${filter.sortBy}`;
  if (filter?.category) query += `&category=${filter.category}`;
  if (typeof filter?.negotiable === 'boolean') query += `&negotiable=${filter.negotiable}`;
  if (filter?.minPrice) query += `&minPrice=${filter.minPrice}`;
  if (filter?.maxPrice) query += `&maxPrice=${filter.maxPrice}`;

  const response = await apiClient.get(query);

  const parsedListings = listings.getAll.parse(response.data.data[0].listings);

  return parsedListings;
};

export default searchListings;
