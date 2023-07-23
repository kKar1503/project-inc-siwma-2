import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';
import { FilterOptions } from '@/services/searchListings';

const CategoryListings = async (
  lastListingId: number,
  categoryId: string | string[] | undefined,
  filter?: FilterOptions
) => {
  let query = `/v1/listings?limit=10&lastIdPointer=${lastListingId}&category=${categoryId}`;
  if (filter?.sortBy) query += `&sortBy=${filter.sortBy}`;
  if (filter?.negotiable) query += `&negotiable=${filter.negotiable}`;
  if (filter?.minPrice) query += `&minPrice=${filter.minPrice}`;
  if (filter?.maxPrice) query += `&maxPrice=${filter.maxPrice}`;

  const response = await apiClient.get(query);

  const parsedListings = listings.getAll.parse(response.data.data[0].listings);

  return parsedListings;
};

export default CategoryListings;
