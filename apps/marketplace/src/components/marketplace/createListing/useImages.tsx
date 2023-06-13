import React, { useState } from 'react';
import ImageUploadForm, {
  Order,
  PreviewImageProps,
} from '@/components/marketplace/createListing/ImageUploadForm';

const useImages = () => {
  const [images, setImages] = useState<Blob[]>([]);
  const [listingImages, setListingImages] = useState<PreviewImageProps[]>([]);
  const [order, setOrder] = useState<Order>({});
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const imagesForm = (
    <ImageUploadForm
      setImages={setImages}
      imagesData={listingImages}
      setOrder={setOrder}
      setDeletedImages={setDeletedImages}
    />
  );

  const imageData = {
    images,
  };

  const imagesOrder = {
    order,
  };

  return {
    imagesForm,
    imageData,
    imagesOrder,
    deletedImages,
    setListingImages,
  };
};

export default useImages;
