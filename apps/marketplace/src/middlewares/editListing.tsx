import { Order } from '@/components/marketplace/createListing/ImageUploadForm';
import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';
import { PutListingsRequestBody } from '@/utils/api/server/zod/listings';

// backend not confirmed yet, backend stuff still in progress...
const editListing = async (
  id: string,
  listingBody: PutListingsRequestBody | undefined,
  images: Blob[] | undefined,
  imagesOrder: Order,
  deletedImages: string[]
) => {
  if (listingBody === undefined || images === undefined) return false;

  const putData = listingBody;

  // remove invalid parameter values
  const response = await apiClient.get(
    `/v1/categories/${listingBody.categoryId}?includeParameters=true`
  );

  const category = categories.getAll.parse(response.data.data);
  const validParameter: string[] = [];
  category[0].parameters?.forEach((parameter) => {
    validParameter.push(parameter.parameterId);
  });

  listingBody.parameters?.forEach((parameter, index) => {
    if (!validParameter.includes(parameter.paramId)) {
      putData.parameters = listingBody.parameters?.filter(
        (item) => item.paramId !== parameter.paramId
      );
    }
  });
  /**
   * 1. Edit listing info
   */

  const result = await apiClient.put(`/v1/listings/${id}`, putData);

  /**
   * 2. Deleting images
   */

  if (deletedImages.length !== 0) {
    let api = `/v1/listings/${id}/images?`;
    deletedImages.forEach((image, index) => {
      if (index !== 0) api += `&`;
      api += `delete=${image}`;
    });
    const imagePromise = await apiClient.delete(api);
  }

  /**
   * 3. Edit listing images
   */

  if (images.length === 0) return true; // no images to post

  images.forEach(async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    await apiClient.put(
      `/v1/listings/${id}/images?insertIndex=${imagesOrder[image.name]}`,
      formData
    );
  });

  return true;
};

export default editListing;
