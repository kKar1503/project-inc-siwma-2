import React, { useState } from 'react';
import ImageUploadForm, { ImageProps } from '@/components/marketplace/createListing/ImageUploadForm';


const useImages = () => {
  const [images, setImages] = useState<Blob[]>([]);


  const imagesForm = <ImageUploadForm setImages={setImages} />;

  const imageData = {
    images,
  };

  return {
    imagesForm,
    imageData,
  };

};

export default useImages;
