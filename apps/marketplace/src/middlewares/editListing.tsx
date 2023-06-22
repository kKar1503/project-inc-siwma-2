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

  /**
   * 1. Remove Invalid Parameter values
   */
  const response = await apiClient.get(
    `/v1/categories/${listingBody.categoryId}?includeParameters=true`
  );
  const category = categories.getAll.parse(response.data.data);

  const validParameter: string[] = [];
  category[0].parameters?.forEach((parameter) => {
    validParameter.push(parameter.parameterId);
  });

  listingBody.parameters?.forEach((parameter) => {
    if (!validParameter.includes(parameter.paramId)) {
      putData.parameters = listingBody.parameters?.filter(
        (item) => item.paramId !== parameter.paramId
      );
    }
  });
  /**
   * 2. Edit listing info
   */

  const editResult = await apiClient.put(`/v1/listings/${id}`, putData);
  if (!editResult) return false;

  /**
   * 3. Delete images
   */

  if (deletedImages.length !== 0) {
    let api = `/v1/listings/${id}/images?`;

    deletedImages.forEach((image, index) => {
      if (index !== 0) api += `&`;
      api += `delete=${image}`;
    });

    const deleteResult = await apiClient.delete(api);
    if (!deleteResult) return false;
  }

  /**
   * 4. Add new images
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
