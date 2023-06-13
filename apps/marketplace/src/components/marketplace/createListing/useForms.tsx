import React, { useEffect, useState } from 'react';
import { PostListingsRequestBody } from '@/utils/api/server/zod';
import useListing from '@/components/marketplace/createListing/useListing';
import useCategory from '@/components/marketplace/createListing/useCategory';
import useListingType from '@/components/marketplace/createListing/useListingType';
import useImages from '@/components/marketplace/createListing/useImages';

const useForms = () => {
  const { listingTypeForm, listingTypeData, setListingType, setDisabled } = useListingType();

  const {
    categoryForm,
    categoryValidation,
    resetCategoryErrors,
    categoryData,
    parameters,
    setCategory,
    categoriesData,
  } = useCategory();

  const { imagesForm, imageData, imagesOrder, deletedImages, setListingImages } = useImages();

  const { parameterForm, parameterValidation, resetParameterErrors, parameterData, setParameters } =
    parameters;

  const {
    listingForm,
    listingValidation,
    resetListingErrors,
    listingData,
    setTitle,
    setPrice,
    setNegotiable,
    setUnitPrice,
    setDescription,
  } = useListing();

  const [formData, setFormData] = useState<{
    listingBody: PostListingsRequestBody;
    images: Blob[];
  }>();

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

  const forms = (
    <>
      {listingTypeForm}
      {categoryForm}
      {imagesForm}
      {parameterForm}
      {listingForm}
    </>
  );

  // filling the form with listing data
  useEffect(() => {
    if (formData) {
      const listing = formData.listingBody;

      setListingType(listing.type);

      categoriesData?.forEach((category) => {
        if (category.id === listing.categoryId) {
          setCategory(category);
        }
      });

      if (listing.parameters) {
        setParameters(listing.parameters);
      }
      setTitle(listing.name);
      setPrice(listing.price);
      setNegotiable(listing.negotiable || false);
      setUnitPrice(listing.unitPrice || false);
      setDescription(listing.description);
    }
  }, [
    categoriesData,
    formData,
    setCategory,
    setDescription,
    setListingType,
    setNegotiable,
    setParameters,
    setPrice,
    setTitle,
    setUnitPrice,
  ]);

  return {
    forms,
    formData,
    imagesOrder,
    deletedImages,
    setFormData,
    submitForm,
    setDisabled,
    setListingImages,
  };
};

export default useForms;
