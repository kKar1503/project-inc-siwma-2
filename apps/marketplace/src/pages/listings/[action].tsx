/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
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

/**
 * Maps default values into react-hook-form default values
 * @returns A default value object for react-hook-form
 */
// const obtainDefaultValues = () => ({
//   companyName: 'Default Company Name',
//   numberInput: '123',
//   dropdownInput: dropdownOptions[0],
//   pillSelectInput: pillSelectOptions[1].value,
// });

const ListingCreateEdit = () => {
  // -- States --//
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // -- Queries -- //
  const products = useQuery('products', async () => fetchProducts());
  const categories = useQuery('categories', async () => fetchCategories(true));
  const isLoading = products.isLoading || categories.isLoading;

  // Responsive breakpoints
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  // Get route params
  const router = useRouter();
  const { id, action } = router.query;

  // -- Data Validation -- //
  if ((action !== 'create' && action !== 'edit') || Number.isNaN(id)) {
    // Redirect the user back to the home page
    router.push('/');
  }

  // Initialise react hook forms
  const formHook = useForm({
    // defaultValues: obtainDefaultValues(),
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

  const categoryParameters = parameters.data;

  const onSubmit = async (
    data: Parameters<React.ComponentProps<typeof ListingCreationForm>['onSubmit']>['0']
  ) => {
    // Clear submit success state
    setSubmitSuccess(false);
    clearErrors();
    setErrorMessage(undefined);

    // Deconstruct common values from data
    const { negotiable, price, product, quantity, listingType, ...categoryParams } = data.data;

    // -- Validation -- //
    // Initialise an array of errors
    const errors: { [key: string]: Error } = {};

    // Validate price
    if (price < 0) {
      errors.price = new Error('Price cannot be negative');
    }

    // Validate quantity
    if (quantity < 0) {
      errors.quantity = new Error('Quantity cannot be negative');
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
      negotiable,
      price: Number(price),
      productId: product.value,
      quantity: Number(quantity),
      type: listingType,
      parameters: selectedCategory?.parameters?.map((e) => ({
        paramId: e.parameterId,
        value: categoryParams[e.parameterId],
      })),
    };

    // Create listing
    const result = await apiClient
      .post('/v1/listings', preparedData)
      .then(() => {
        // Success
        reset();
        setSubmitSuccess(true);
        setOpenModal(true);
        // onSuccessChange();
      })
      .catch((err) => {
        // An error occurred
        // Display a error message
        setErrorMessage(
          t('An error occurred while creating the listing, please try again later') || ''
        );

        // Error all the input fields
        Object.keys(data.data).forEach((inputName) => {
          setError(inputName, {});
        });
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
    unregister(parameterIds);
  }, [selectedProduct]);

  return (
    <>
      <OnCreateModal
        content="Your listing is now on the marketplace"
        open={openModal}
        setOpen={setOpenModal}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: 4,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: isSm ? 2 : 4,
            backgroundColor: 'white',
            width: isSm ? '95%' : '80%',
            borderRadius: '8px',
            boxShadow: '4',
            margin: 'auto',
          }}
        >
          <Box>
            <Typography variant="h6">{t('Create a listing')}</Typography>
            <Typography variant="body1">
              {t('Create a buy or a sell listing to be shared on your profile')}
            </Typography>
            <Divider sx={{ marginTop: 2, marginBottom: 3 }} />
          </Box>
          <Box>
            <ListingCreationForm
              categoryParameters={categoryParameters}
              formHook={formHook}
              isLoading={isLoading}
              onSubmit={onSubmit}
              products={products}
              selectedCategory={selectedCategory}
              selectedProduct={selectedProduct}
              submitSuccess={submitSuccess}
              errorMessage={errorMessage}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ListingCreateEdit;
