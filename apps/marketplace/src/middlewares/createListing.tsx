import apiClient from '@/utils/api/client/apiClient';
import { PostListingsRequestBody } from '@/utils/api/server/zod/listings';

// backend not confirmed yet, backend stuff still in progress...
const createListing = async (listingBody: PostListingsRequestBody | undefined, images: Blob[] | undefined) => {

  // undefined validation (simple validation as other validation is done in the form)
  if (listingBody === undefined || images === undefined) return false;

  /**
   * 1. Post listing
   */

    // Post listing
  const result = await apiClient.post('/v1/listings', listingBody);

  /**
   * 2. Post images
   */
  // Post images
  if (images.length === 0) return true; // no images to post

  // get listing id
  const { id } = result.data;

  // form data to store images
  const formData = new FormData();
  // append images to form data
  images.forEach((image) => formData.append('file', image));
  // post images
  await apiClient.put(`/v1/listings/${id}/images`, formData);

  return true;
};

export default createListing;
