import React, { useState, useEffect } from 'react';
import client from '@/utils/api/client/apiClient';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ListingTypeForm, {
  ListingTypeProps,
} from '@/components/marketplace/createListing/ListingTypeForm';
import ListingForm, {
  ListingValidationProps,
} from '@/components/marketplace/createListing/ListingForm';
import ParameterForm, {
  ParameterProps,
  ParameterFormProps,
  CategoryParametersProps,
  ParameterValidationProps,
} from '@/components/marketplace/createListing/ParameterForm';
import ImageUploadForm, {
  ImageProps,
} from '@/components/marketplace/createListing/ImageUploadForm';
import CategoryForm, { CategoryProps } from '@/components/marketplace/createListing/CategoryForm';
import OnLeaveModal from '@/components/modal/OnLeaveModal';

export interface CreateListingProps {
  name: string;
  description: string;
  price: number;
  unitPrice?: boolean;
  negotiable?: boolean;
  categoryId: string;
  listingType: ListingTypeProps;
  images?: ImageProps[];
  coverImage?: null;
  parameters?: ParameterFormProps[];
}

export interface CreateListingDataProps {
  data: CategoryProps[];
}

export const getServerSideProps = async () => {
  const { data } = await client.get(`/v1/categories?includeParameters=${true}`);

  return {
    props: {
      data: data.data,
    },
  };
};

const CreateListingPage = ({ data }: CreateListingDataProps) => {
  const [listingType, setListingType] = useState<ListingTypeProps>('BUY');
  const [category, setCategory] = useState<CategoryProps | null>(null);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [parameters, setParameters] = useState<ParameterFormProps[]>([]);
  const [detailedParameters, setDetailedParameters] = useState<ParameterProps[]>([]);
  const [categoryParameters, setCategoryParameters] = useState<CategoryParametersProps[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [unitPrice, setUnitPrice] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

  // validation
  const [categoryError, setCategoryError] = useState<string>('');
  const [parameterErrors, setParameterErrors] = useState<ParameterValidationProps[]>([]);
  const [listingErrors, setListingErrors] = useState<ListingValidationProps>({
    nameError: '',
    descriptionError: '',
    priceError: '',
  });

  const sortCategoryParameters = async () => {
    const parameterIds: string[] = [];
    const categoryParameters: CategoryParametersProps[] = [];

    if (category != null) {
      category.parameters.forEach((parameter) => {
        const { parameterId } = parameter;
        parameterIds.push(parameterId);
        categoryParameters.push(parameter);
      });

      // currently endpoint doesn't work and returns all parameters.
      const { data } = await client.get(`/v1/parameters?ids=${parameterIds}`);

      setCategoryParameters(categoryParameters);
      setDetailedParameters(data.data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category || !category.id) {
      setCategoryError('Category is required');
      return;
    }

    // listing form validation
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
    }

    if (!formIsValid) {
      setListingErrors(newErrors);
      return;
    }

    // parameter form validation
    const newParameterErrors: ParameterValidationProps[] = [];

    // validate required parameters
    categoryParameters.forEach((categoryParameter) => {
      const { parameterId, required } = categoryParameter;
      const parameter = parameters.find((parameter) => parameter.paramId === parameterId);
      const detailedParameter = detailedParameters.find(
        (parameter) => parameter.id === parameterId
      );

      if (detailedParameter) {
        if (!parameter && required) {
          newParameterErrors.push({
            parameterId,
            error: `${detailedParameter.displayName} is required`,
          });
        }

        switch (detailedParameter.dataType) {
          case 'number':
            if (parameter && !Number.isNaN(parameter.value)) {
              newParameterErrors.push({
                parameterId,
                error: `${detailedParameter.displayName} must be a number`,
              });
            }
            break;
          case 'boolean':
            if (parameter && typeof parameter.value !== 'boolean') {
              newParameterErrors.push({
                parameterId,
                error: `${detailedParameter.displayName} must be a boolean`,
              });
            }
            break;
          default:
            break;
        }
      }
    });

    setParameterErrors(newParameterErrors);

    const formData: CreateListingProps = {
      name: title,
      description,
      price,
      unitPrice,
      negotiable,
      categoryId: category.id,
      listingType,
      images,
      coverImage: null,
      parameters,
    };

    await client.post(`v1/listings/`, formData);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenCancelModal(true);
  };

  useEffect(() => {
    sortCategoryParameters();
  }, [category]);

  return (
    <Container maxWidth="lg" sx={{ boxShadow: 4, padding: 2, marginTop: 2, marginBottom: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Create Listing
            </Typography>
            <Typography variant="body1">
              Create a buy or a sell listing to be shared on your profile.
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Divider />
          </Grid>

          <ListingTypeForm setListingType={setListingType} />
          {data && <CategoryForm setCategory={setCategory} data={data} error={categoryError} />}
          <ImageUploadForm setImages={setImages} />
          {category && (
            <ParameterForm
              setParameters={setParameters}
              data={detailedParameters}
              errors={parameterErrors}
            />
          )}
          <ListingForm
            setTitle={setTitle}
            setPrice={setPrice}
            setNegotiable={setNegotiable}
            setUnitPrice={setUnitPrice}
            setDescription={setDescription}
            errors={listingErrors}
          />

          <Grid item xs={6} md={6} sx={{ width: '100%' }}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              onClick={handleCancel}
              sx={({ palette }) => ({
                backgroundColor: palette.error.main,
              })}
              fullWidth
            >
              Cancel Listing
            </Button>
            <OnLeaveModal open={openCancelModal} setOpen={setOpenCancelModal} />
          </Grid>
          <Grid item xs={6} md={6} sx={{ width: '100%' }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              CREATE LISTING
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateListingPage;
