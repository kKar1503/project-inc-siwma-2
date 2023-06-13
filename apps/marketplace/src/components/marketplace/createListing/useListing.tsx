import ListingForm, {
  ListingValidationProps,
} from '@/components/marketplace/createListing/ListingForm';
import React, { useState } from 'react';

const useListing = () => {
  const [price, setPrice] = useState<number>(0);
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [unitPrice, setUnitPrice] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [listingErrors, setListingErrors] = useState<ListingValidationProps>({
    nameError: '',
    descriptionError: '',
    priceError: '',
  });

  const listingForm = (
    <ListingForm
      title={title}
      price={price}
      negotiable={negotiable}
      unitPrice={unitPrice}
      description={description}
      setTitle={setTitle}
      setPrice={setPrice}
      setNegotiable={setNegotiable}
      setUnitPrice={setUnitPrice}
      setDescription={setDescription}
      errors={listingErrors}
    />
  );

  const resetListingErrors = () => {
    setListingErrors({
      nameError: '',
      descriptionError: '',
      priceError: '',
    });
  };

  const listingValidation = () => {
    let formIsValid = true;
    const newErrors: ListingValidationProps = {
      nameError: '',
      descriptionError: '',
      priceError: '',
    };

    if (title.trim() === '') {
      newErrors.nameError = 'Name is required';
      formIsValid = false;
    }

    if (description.trim() === '') {
      newErrors.descriptionError = 'Description is required';
      formIsValid = false;
    }

    if (price <= 0) {
      newErrors.priceError = 'Price must be greater than 0';
      formIsValid = false;
    } else if (Number.isNaN(price)) {
      newErrors.priceError = 'Price must be a number';
      formIsValid = false;
    }

    if (!formIsValid) {
      setListingErrors(newErrors);
    }

    return formIsValid;
  };

  const listingData = {
    name: title,
    description,
    price,
    unitPrice,
    negotiable,
    multiple: false,
  };

  return {
    listingForm,
    listingValidation,
    listingData,
    resetListingErrors,
    setTitle,
    setPrice,
    setNegotiable,
    setUnitPrice,
    setDescription,
  };
};

export default useListing;
