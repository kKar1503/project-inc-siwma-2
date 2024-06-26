/* eslint-disable @typescript-eslint/ban-ts-comment */
import S3BoxImage from '@/components/S3BoxImage';
import CategoryParamInput from '@/components/listingCreation/CategoryParamInput';
import ProductDetail from '@/components/listingCreation/ProductDetail';
import { Typography, Divider, Button } from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { FieldValues, Form, FormProvider, useForm } from 'react-hook-form';
import { useResponsiveness } from '@inc/ui';
import { Category, Parameter, Product } from '@/utils/api/client/zod';
import FormInputGroup from '../FormInputGroup';
import FormToggleButton, { FormToggleButtonOption } from '../FormToggleButton';
import FormSearchDropdown from '../FormSearchDropdown';
import FormNumberInput from '../FormNumberInput';
import FormCheckboxInput from '../FormCheckboxInput';

const listingTypeOptions: FormToggleButtonOption[] = [
  { label: 'BUYING', value: 'BUY' },
  { label: 'SELLING', value: 'SELL' },
];

type ListingCreationFormProps = {
  products: { data?: Product[]; isLoading: boolean };
  selectedProduct?: Product;
  selectedCategory?: Category;
  categoryParameters?: Parameter[];
  isLoading: boolean;
  submitSuccess: boolean;
  onSubmit: (data: FieldValues) => void;
  formHook: ReturnType<typeof useForm>;
  resetFlag: string;
  errorMessage?: string;
};

const ListingCreationForm = ({
  products,
  selectedProduct,
  selectedCategory,
  categoryParameters,
  isLoading,
  submitSuccess,
  onSubmit,
  formHook,
  resetFlag,
  errorMessage,
}: ListingCreationFormProps) => {
  // -- Hooks -- //
  const [isSm] = useResponsiveness(['sm']);
  const { control } = formHook;

  return (
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
          label="Listing Type"
          name="listingType"
          isLoading={isLoading}
          success={submitSuccess}
          required
        >
          {/** @ts-ignore */}
          <FormToggleButton options={listingTypeOptions} placeholder="Listing Type Selection" />
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
            resetFlag={resetFlag}
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
                    selectedCategory?.parameters?.find((f) => e.id === f.parameterId)?.required
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
          <Typography variant="body1">{t('Enter the details of the listing below')}</Typography>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <FormInputGroup
              label="Negotiable"
              name="negotiable"
              isLoading={isLoading}
              success={submitSuccess}
              hideError
            >
              {/** @ts-ignore */}
              <FormCheckboxInput options={[{ label: 'Negotiable', value: true }]} />
            </FormInputGroup>
            <Typography variant="body1" fontWeight="medium" color="red">
              {errorMessage}
            </Typography>
          </Box>
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
  );
};

export default ListingCreationForm;
