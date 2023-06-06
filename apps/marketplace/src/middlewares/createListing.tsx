import apiClient from '@/utils/api/client/apiClient';
import { PostListingsRequestBody } from '@/utils/api/server/zod/listings';

// backend not confirmed yet, backend stuff still in progress...
const createListing = async (data: { listingBody: PostListingsRequestBody, images: Blob[] } | undefined) => {
  // const parsedListing = listings.create.parse(listing);
  if (data === undefined) return false;
  const { listingBody, images } = data;
  const formData = new FormData();
  images.forEach((image) => formData.append('file', image));

  const result = await apiClient.post('/v1/listings', listingBody);
  const { id } = result.data;
  await apiClient.put(`/v1/listings/${id}/images`, formData);

  return true;
};

export default createListing;
