import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';
import { PostListingsRequestBody } from '@/utils/api/server/zod/listings';

// backend not confirmed yet, backend stuff still in progress...
const createListing = async (listing: PostListingsRequestBody | undefined) => {
  // const parsedListing = listings.create.parse(listing);
  const response = await apiClient.post('/v1/listings', listing);

  return response;
};

export default createListing;
