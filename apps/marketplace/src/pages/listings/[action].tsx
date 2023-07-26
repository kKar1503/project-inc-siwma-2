/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Divider, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { validateCompanyName } from '@/utils/api/validate';
import { FormToggleButtonOption } from '@/components/forms';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchProducts from '@/services/fetchProducts';
import fetchCategories from '@/services/fetchCategories';
import { t } from 'i18next';
import { useResponsiveness } from '@inc/ui';
import fetchParams from '@/services/fetchParamNames';
import ListingCreationForm from '@/components/forms/listingCreationForm/ListingCreationForm';

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
  const [isErrored, setIsErrored] = useState(false);

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
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    control,
    getValues,
    formState: { isDirty, dirtyFields },
  } = formHook;

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

  const onSubmit = (data: FieldValues) => {
    console.log('submit');

    // Deconstruct values from data
    const { companyName } = data.data;

    // -- Validation -- //
    // Initialise an array of errors
    const errors: { [key: string]: Error } = {};

    console.log({ data });

    // Validate all data
    Object.keys(data.data).forEach((key) => {
      console.log({ key });
      try {
        if (key === 'companyName') {
          validateCompanyName(companyName);
        }
      } catch (err) {
        errors[key] = err as Error;
      }
    });

    console.log({ errors });

    // Check if there were any errors
    if (Object.keys(errors).length > 0) {
      // There was an error
      setIsErrored(true);

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

    // Success, reset the default value of the inputs and show success message
    reset(data, { keepValues: true });
    setSubmitSuccess(true);
    // onSuccessChange();
  };

  // Reset the default values of the input when the queryData provided changes
  // useEffect(() => {
  //   if (!isLoading && !submitSuccess && !isDirty) {
  //     reset(obtainDefaultValues(company, { keepValues: true }));
  //   }
  // }, [company]);

  // Clear success state of the form as soon as a input value changes
  useEffect(() => {
    // Checks that the form submission state is currently successful, and that there is at least 1 dirty input
    if (submitSuccess && isDirty) {
      // There is at least 1 dirty input, clear the success status of the form
      setSubmitSuccess(false);
    }
  }, [isDirty]);

  return (
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
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCreateEdit;
