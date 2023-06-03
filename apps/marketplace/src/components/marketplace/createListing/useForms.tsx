import React, { useState } from 'react';
import { PostListingsRequestBody } from '@/utils/api/server/zod';
import useListing from '@/components/marketplace/createListing/useListing';
import useCategory from '@/components/marketplace/createListing/useCategory';
import useListingType from '@/components/marketplace/createListing/useListingType';
import useImages from '@/components/marketplace/createListing/useImages';


const useForms = () => {

  const { listingTypeForm, listingTypeData } = useListingType();
  const { categoryForm, categoryValidation, resetCategoryErrors, categoryData, parameters } = useCategory();
  const { imagesForm, imageData } = useImages();
  const { parameterForm, parameterValidation, resetParameterErrors, parameterData } = parameters;
  const { listingForm, listingValidation, resetListingErrors, listingData } = useListing();


  const [formData, setFormData] = useState<{listingBody: PostListingsRequestBody ,images:Blob[]}>();


  const validateForm = () => {
    resetListingErrors();
    resetCategoryErrors();
    resetParameterErrors();

    const listingValid = listingValidation();
    const categoryValid = categoryValidation();
    const parameterValid = parameterValidation();

    return listingValid && categoryValid && parameterValid;
  };

  const submitForm = (): boolean => {
    // backend api currently have conflicts
    const listingBody: PostListingsRequestBody = {
      ...listingData,
      ...categoryData,
      ...parameterData,
      ...listingTypeData,
      multiple: false,
    };

    if (!validateForm()) return false;
    setFormData({
      listingBody,
      ...imageData,
    });
    return true;
  };

  const forms = <>
    {listingTypeForm}
    {categoryForm}
    {imagesForm}
    {parameterForm}
    {listingForm}
  </>;


  return {
    forms,
    formData,
    submitForm,
  };
};

export default useForms;
