import { ImageOrder } from '@/components/marketplace/createListing/ImageUploadForm';
import apiClient from '@/utils/api/client/apiClient';
import categories from '@/utils/api/client/zod/categories';
import { PutListingsRequestBody } from '@/utils/api/server/zod/listings';
import { ReturnType } from './createListing';

// backend not confirmed yet, backend stuff still in progress...
const editListing = async (
  id: string,
  listingBody: PutListingsRequestBody | undefined,
  images: Blob[] | undefined,
  imagesOrder: ImageOrder,
  deletedImages: string[]
): Promise<ReturnType> => {
  try {
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

    await apiClient.put(`/v1/listings/${id}`, putData);

    /**
     * 3. Delete images
     */

    if (deletedImages.length !== 0) {
      let api = `/v1/listings/${id}/images?`;

      deletedImages.forEach((image, index) => {
        if (index !== 0) api += `&`;
        api += `delete=${image}`;
      });

      await apiClient.delete(api);
    }

    /**
     * 4. Add new images
     */

    if (images.length === 0) return { success: true, id }; // no images to post

    const formData = new FormData();
    images.forEach((image) => formData.append('file', image));
    await apiClient.put(`/v1/listings/${id}/images`, formData);

    return { success: true, id };
  } catch (error: unknown) {
    const errorBody = error as { data: { errors: { detail: string }[] } };
    const hashset: Record<string, boolean> = {}; // only using keys, values are always true (doesn't matter)

    errorBody.data.errors.forEach((error: { detail: string }) => {
      hashset[error.detail] = true;
    });

    const errorMessages = Object.keys(hashset);

    return { success: false, errorMessages };
  }
};

export default editListing;
