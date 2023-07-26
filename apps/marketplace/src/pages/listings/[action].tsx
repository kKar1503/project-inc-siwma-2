/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, Divider, Typography } from '@mui/material';
import { FieldValues, Form, FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { validateCompanyName } from '@/utils/api/validate';
import {
  FormSearchDropdown,
  FormInputGroup,
  FormToggleButton,
  FormToggleButtonOption,
  FormCheckboxInput,
} from '@/components/forms';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchProducts from '@/services/fetchProducts';
import fetchCategories from '@/services/fetchCategories';
import { t } from 'i18next';
import { useResponsiveness } from '@inc/ui';
import ProductDetail from '@/components/listingCreation/ProductDetail';
import CategoryParamInput from '@/components/listingCreation/CategoryParamInput';
import fetchParams from '@/services/fetchParamNames';
import S3BoxImage from '@/components/S3BoxImage';
import FormNumberInput from '@/components/forms/FormNumberInput';

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

const listingTypeOptions: FormToggleButtonOption[] = [
  { label: 'BUYING', value: 'BUY' },
  { label: 'SELLING', value: 'SELL' },
];

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
          <Form
            onSubmit={onSubmit}
            control={control}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isSm ? '0.5rem' : '1rem',
            }}
          >
            <FormProvider {...formHook}>
              <FormInputGroup
                sx={{ flex: 1 }}
                label="Toggle Select Input"
                name="toggleSelectInput"
                isLoading={isLoading}
                success={submitSuccess}
                required
              >
                {/** @ts-ignore */}
                <FormToggleButton options={listingTypeOptions} placeholder="Sample Placeholder" />
              </FormInputGroup>
              <FormInputGroup
                sx={{ flex: 1 }}
                label="Product"
                name="product"
                isLoading={isLoading}
                success={submitSuccess}
                required
              >
                {/** @ts-ignore */}
                <FormSearchDropdown
                  options={
                    products.data?.map((e) => ({
                      label: e.name || 'Unamed Product',
                      value: e.id,
                    })) || []
                  }
                />
              </FormInputGroup>

              {/** Product Info */}
              <Box>
                <Typography variant="h6">{t('Product Info')}</Typography>
                <Typography variant="body1">{t('Information on the Selected Product')}</Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <ProductDetail header={t('Product Name')} text={selectedProduct?.name} />
                  <ProductDetail
                    header={t('Product Name (Chinese)')}
                    text={selectedProduct?.chineseName}
                  />
                  <ProductDetail header={t('Unit')} text={selectedProduct?.unit} />
                  <ProductDetail header={t('Chinese Unit')} text={selectedProduct?.chineseUnit} />
                  <ProductDetail header={t('Category')} text={selectedCategory?.name} />
                </Box>
                <ProductDetail header={t('Description')} text={selectedProduct?.description} />
              </Box>

              {/** Category Parameters */}
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6">{t('Category Parameters')}</Typography>
                <Typography variant="body1">
                  {t('Enter the parameters specific to the chosen category')}
                </Typography>
                <Divider sx={{ marginTop: 2, marginBottom: selectedProduct ? 3 : 1 }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: isSm ? 'column' : 'row',
                    alignItems: 'start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: isSm ? 'column' : 'row',
                      justifyContent: 'space-between',
                      alignItems: 'end',
                      marginBottom: 3,
                      flexWrap: 'wrap',
                      columnGap: 3,
                      rowGap: 2,
                      width: isSm ? '100%' : '80%',
                    }}
                  >
                    {categoryParameters?.map((e) => (
                      <CategoryParamInput
                        key={e.id}
                        parameter={e}
                        isLoading={isLoading}
                        submitSuccess={submitSuccess}
                        required={
                          selectedCategory?.parameters?.find((f) => e.id === f.parameterId)
                            ?.required
                        }
                        sx={{
                          minWidth: isSm ? '45%' : '15%',
                          width: isSm ? '100%' : undefined,
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    width={isSm ? '100%' : undefined}
                    flex={1}
                    margin="auto"
                    textAlign="center"
                    display={!selectedProduct ? 'none' : undefined}
                  >
                    <Typography variant="body1" fontWeight="medium" sx={{ marginBottom: '0.5rem' }}>
                      {t('Cross Section Image')}
                    </Typography>
                    <S3BoxImage
                      sx={{
                        width: '70%',
                      }}
                      src={selectedCategory?.crossSectionImage || ''}
                    />
                  </Box>
                </Box>
                {!selectedProduct && (
                  <Box flex={1} textAlign="center">
                    <Typography variant="h6">{t('No Product Selected')}</Typography>
                  </Box>
                )}
              </Box>

              {/** General Information */}
              <Box sx={{ marginTop: isSm ? 3 : undefined }}>
                <Typography variant="h6">{t('General Information')}</Typography>
                <Typography variant="body1">
                  {t('Enter the details of the listing below')}
                </Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 3 }} />
                <Box
                  sx={{
                    display: 'flex',
                    columnGap: 3,
                  }}
                >
                  <FormInputGroup
                    sx={{ flex: 1 }}
                    label="Price"
                    name="price"
                    isLoading={isLoading}
                    success={submitSuccess}
                    required
                  >
                    {/** @ts-ignore */}
                    <FormNumberInput prefix="S$" min={0} />
                  </FormInputGroup>
                  <FormInputGroup
                    sx={{ flex: 1 }}
                    label="Quantity"
                    name="quantity"
                    isLoading={isLoading}
                    success={submitSuccess}
                    required
                  >
                    {/** @ts-ignore */}
                    <FormNumberInput min={0} />
                  </FormInputGroup>
                </Box>
                <FormInputGroup
                  sx={{ flex: 1 }}
                  label="Negotiable"
                  name="negotiable"
                  isLoading={isLoading}
                  success={submitSuccess}
                >
                  {/** @ts-ignore */}
                  <FormCheckboxInput options={[{ label: 'Negotiable', value: true }]} />
                </FormInputGroup>
              </Box>
            </FormProvider>
            <Box
              sx={{
                display: 'flex',
                columnGap: 3,
                width: '100%',
              }}
            >
              <Button type="button" variant="contained" color="error" sx={{ p: 2, flex: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ p: 2, flex: 1 }}>
                Create Listing
              </Button>
            </Box>
          </Form>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCreateEdit;
