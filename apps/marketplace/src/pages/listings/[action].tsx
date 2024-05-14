/* eslint-disable @typescript-eslint/ban-ts-comment */
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchProducts from '@/services/fetchProducts';
import fetchCategories from '@/services/fetchCategories';
import { t } from 'i18next';
import { useResponsiveness } from '@inc/ui';
import fetchParams from '@/services/fetchParamNames';
import ListingCreationForm from '@/components/forms/listingCreationForm/ListingCreationForm';
import apiClient from '@/utils/api/client/apiClient';
import OnCreateModal from '@/components/modal/OnCreateModal';
import fetchListing from '@/services/fetchListing';
import { Listing, Product } from '@/utils/api/client/zod';
import type { SxProps } from '@mui/material/styles';
import NoInternetConnection from '@/components/NoInternet';

/**
 * Maps default values into react-hook-form default values
 * @returns A default value object for react-hook-form
 */
const obtainDefaultValues = (data: Listing, product: Product) => {
  const params = Object.fromEntries(
    data.parameters?.map((e) => [`param-${e.paramId}`, e.value]) || []
  );

  const result = {
    negotiable: data.negotiable,
    price: data.price,
    product: {
      label: product.name || 'Unamed Product',
      value: product.id,
    },
    quantity: data.quantity,
    listingType: data.type,
    ...params,
  };

  console.log({ params, result });

  return result;
};

// const obtainDefaultValues = () => ({
//   '2': '147',
//   '9': '102',
//   '10': '30',
//   negotiable: true,
//   price: 80,
//   product: {
//     label: 'Stainless Steel Round Bar',
//     value: '2',
//   },
//   quantity: 15,
//   listingType: 'SELL',
// });

const ListingCreateEdit = () => {
  // -- States --//
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [resetFlag, setResetFlag] = useState<string>('');

  // Get route params
  const router = useRouter();
  const { id, action } = router.query;

  // -- Queries -- //
  const products = useQuery('products', async () => fetchProducts());
  const categories = useQuery('categories', async () => fetchCategories(true));
  const selectedListing = useQuery('listing', async () => fetchListing(id as string), {
    enabled: action === 'edit' && id !== undefined,
  });

  const isLoading = products.isLoading || categories.isLoading || selectedListing.isLoading;

  // Responsive breakpoints
  const [isSm] = useResponsiveness(['sm']);

  const tableMaxWidthContainer = useMemo<SxProps>(() => {
    if (!isSm) return { minWidth: 900, px: 'calc(50vw - 656px)' };
    return {};
  }, [isSm]);

  // -- Data Validation -- //
  const isEditing = action === 'edit';
  const isCreating = action === 'create';

  if (isEditing && Number.isNaN(id)) {
    // Redirect the user back to the home page
    router.push('/');
  }

  console.log({ selectedListing });

  // Check if the provided id is valid
  if (isEditing && selectedListing.isError && !selectedListing.data) {
    // Redirect the user back to the home page
    router.push('/');
  }

  // Find the product that the listing is for
  const product = products.data?.find((e) => e.id === selectedListing.data?.productId);

  // Initialise react hook forms
  const formHook = useForm({
    defaultValues:
      selectedListing.data && product
        ? obtainDefaultValues(selectedListing.data, product)
        : undefined,
  });

  // Deconstruct the individual hooks from the object
  const {
    reset,
    setError,
    clearErrors,
    unregister,
    watch,
    getValues,
    formState: { isDirty, dirtyFields },
  } = formHook;

  // Watch all inputs
  const watchAllFields = watch();

  // Obtain the value of the currently selected product
  const selectedProduct = products.data?.find((e) => e.id === getValues('product')?.value);
  const selectedCategory = categories.data?.find((e) => e.id === selectedProduct?.categoryId);

  const parameters = useQuery(
    ['parameters', selectedCategory?.parameters?.map((e) => e.parameterId)],
    async () => fetchParams(selectedCategory?.parameters?.map((e) => e.parameterId)),
    {
      enabled: !!selectedCategory,
    }
  );

  console.log({ values: getValues() });

  const categoryParameters = parameters.data;

  const onSuccess = (data: Parameters<typeof reset>[0]) => {
    // Success
    reset(data, { keepValues: true });
    setSubmitSuccess(true);
    setOpenModal(true);
    // onSuccessChange();
  };

  const onError = (
    data: Parameters<React.ComponentProps<typeof ListingCreationForm>['onSubmit']>['0']
  ) => {
    // An error occurred
    // Display a error message
    setErrorMessage(
      t('An error occurred while creating the listing, please try again later') || ''
    );

    // Error all the input fields
    // @ts-ignore
    Object.keys(data.data).forEach((inputName) => setError(inputName, {}));
  };

  const onSubmit = async (
    data: Parameters<React.ComponentProps<typeof ListingCreationForm>['onSubmit']>['0']
  ) => {
    // Clear submit success state
    setSubmitSuccess(false);
    clearErrors();
    setErrorMessage(undefined);

    console.log({ openModal });

    // Deconstruct common values from data
    const { negotiable, price, product, quantity, listingType, ...$categoryParams } = data.data;
    console.log({ $categoryParams });

    const categoryParams = Object.fromEntries(
      Object.keys($categoryParams).map((e) => [e.replace('param-', ''), $categoryParams[e]]) || []
    );

    // -- Validation -- //
    // Initialise an array of errors
    const errors: { [key: string]: Error } = {};

    // Validate price
    if (price < 0 || Number.isNaN(price)) {
      errors.price = new Error('Price must be a positive number');
    } else if (!/^(\d+(\.\d{1,2})?)$/.test(price)) {
      errors.price = new Error('Price must be in a valid format (e.g., 1.00)');
    }

    // Validate quantity
    if (quantity <= 0) {
      errors.quantity = new Error('Quantity must be greater than 0');
    }

    // Validate category parameters
    Object.keys(categoryParams).forEach((key) => {
      // Check if the parameter is required
      if (selectedCategory?.parameters?.find((e) => e.parameterId === key)?.required) {
        // Check if the parameter is empty
        if (!categoryParams[key]) {
          // Parameter is empty
          errors[key] = new Error(
            `${categoryParameters?.find((e) => e.id === key)?.displayName} is required`
          );
        }

        // Check if the parameter is a number
        if (
          (categoryParameters?.find((e) => e.id === key)?.dataType === 'number' &&
            Number.isNaN(categoryParams[key])) ||
          categoryParams[key] <= 0
        ) {
          // Parameter is not a number
          errors[key] = new Error(
            `${
              categoryParameters?.find((e) => e.id === key)?.displayName
            } must be a number more than 0`
          );
        }
      }
    });

    // Check if there were any errors
    if (Object.keys(errors).length > 0) {
      // There was an error
      // Error all the input fields
      Object.keys(data.data).forEach((inputName) => {
        if (errors[inputName]) {
          setError(inputName as Parameters<typeof setError>['0'], {
            message: errors[inputName].message,
          });
        }
      });

      return;
    }

    // -- Submission -- //
    // Prepare the data to be submitted
    const preparedData = {
      negotiable: Boolean(negotiable),
      price: Number(price),
      productId: product.value,
      quantity: Number(quantity),
      type: listingType,
      parameters: selectedCategory?.parameters?.map((e) => ({
        paramId: e.parameterId,
        value: categoryParams[e.parameterId],
      })),
    };

    // Check if the user is editing a listing
    if (isEditing) {
      // Edit listing
      await apiClient
        .put(`/v1/listings/${id}`, preparedData)
        .then(() => {
          onSuccess(data.data);
        })
        .catch((err) => {
          onError(data);
        });

      return;
    }

    // Create listing
    await apiClient
      .post('/v1/listings', preparedData)
      .then(() => {
        onSuccess(data.data);
      })
      .catch((err) => {
        onError(data);
      });
  };

  // Clear success state of the form as soon as a input value changes
  useEffect(() => {
    // Checks that the form submission state is currently successful, and that there is at least 1 dirty input
    if (submitSuccess && Object.keys(dirtyFields).length > 0) {
      // There is at least 1 dirty input, clear the success status of the form
      setSubmitSuccess(false);
    }
  }, [watchAllFields]);

  // Clear success state of the form as soon as a input value changes
  useEffect(() => {
    // Checks that the form submission state is currently successful, and that there is at least 1 dirty input
    if (submitSuccess && isDirty) {
      // There is at least 1 dirty input, clear the success status of the form
      setSubmitSuccess(false);
    }
  }, [isDirty]);

  // Unregister the category parameters when the selected product changes (So that they don't affect validation)
  useEffect(() => {
    // Obtain ids of the parameters
    const parameterIds = selectedCategory?.parameters?.map((e) => e.parameterId);

    if (!parameterIds) {
      return;
    }

    // Reset the category parameters
    // @ts-ignore
    unregister(parameterIds);
  }, [selectedProduct]);

  // Update the default values when the data loads
  useEffect(() => {
    console.log({ id, selectedListing, product, isLoading });
    console.log(id && selectedListing.data && product);
    if (id && selectedListing.data && product) {
      console.log('resetting');
      // Update the default values
      reset(obtainDefaultValues(selectedListing.data, product), {
        keepValues: false,
      });

      // Reset the reset flag
      setResetFlag(Math.random().toString());
    }
  }, [selectedListing.isSuccess, products.isSuccess]);

  // if neither edit nor create, render 404 page
  if (!isEditing && !isCreating) {
    router.push('/404');
  }

  return (
    <>
      <OnCreateModal
        title={isEditing ? t('Successfully updated listing') || undefined : undefined}
        content={
          isEditing
            ? t('Your listing has been updated')
            : t('Your listing is now on the marketplace')
        }
        open={openModal}
        // onRightButtonPress={() => setOpenModal(false)}
        setOpen={setOpenModal}
      />
      <Box
        sx={{
          ...tableMaxWidthContainer,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: isSm ? 2 : 4,
            backgroundColor: 'white',
            width: '100%',
            borderRadius: '8px',
            boxShadow: '4',
            margin: 'auto',
          }}
        >
          <Box>
            <Typography variant="h6">{t('Create a listing')}</Typography>
            <Typography variant="body1">
              {t('Create a new listing to be shared on your profile.')}
            </Typography>
            <Divider sx={{ marginTop: 2, marginBottom: 3 }} />
          </Box>
          <Box>
            <ListingCreationForm
              categoryParameters={categoryParameters}
              // @ts-ignore
              formHook={formHook}
              isLoading={isLoading}
              onSubmit={onSubmit}
              products={products}
              selectedCategory={selectedCategory}
              selectedProduct={selectedProduct}
              submitSuccess={submitSuccess}
              errorMessage={errorMessage}
              resetFlag={resetFlag}
            />
          </Box>
        </Box>
      </Box>
      {/* <NoInternetConnection /> */}
    </>
  );
};

export default ListingCreateEdit;
