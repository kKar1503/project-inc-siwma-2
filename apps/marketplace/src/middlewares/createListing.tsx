import apiClient from '@/utils/api/client/apiClient';
import { PostListingsRequestBody } from '@/utils/api/server/zod/listings';

// backend not confirmed yet, backend stuff still in progress...
const createListing = async (listingBody: PostListingsRequestBody | undefined, images: Blob[] | undefined) => {
  try {
    // undefined validation (simple validation as other validation is done in the form)
    if (listingBody === undefined || images === undefined) return false;

    /**
     * 1. Post listing
     */

      // Post listing
    const result = await apiClient.post('/v1/listings', listingBody);

    // if you're not posting images then just ignore the rest of the code and just return true

    /**
     * 2. Post images
     */
    // Post images
    if (images.length === 0) return true; // no images to post

    // get listing id
    const { listingId: id } = result.data.data[0];

    // form data to store images
    const formData = new FormData();
    // append images to form data
    images.forEach((image) => formData.append('file', image));
    // post images
    await apiClient.put(`/v1/listings/${id}/images`, formData);

    return true;
  } catch (error: unknown) {
    const errorBody = error as { data: { errors: { detail: string }[] } };
    const hashset: Record<string, boolean> = {}; // only using keys, values are always true (doesn't matter)
    errorBody.data.errors.forEach((error: { detail: string }) => {
      hashset[error.detail] = true;
    });
    const errorMessages = Object.keys(hashset);
    window.alert(`Error occurred when creating listing:\n${errorMessages.join('\n')}`);
    return false;
  }
};

export default createListing;
