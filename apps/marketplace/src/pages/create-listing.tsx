import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// components
import ListingTypeForm, {
  ListingTypeProps,
} from '@/components/marketplace/createListing/ListingTypeForm';
import ListingForm, {
  ListingValidationProps,
} from '@/components/marketplace/createListing/ListingForm';
import ParameterForm, {
  ParameterFormProps,
  CategoryParametersProps,
  ParameterValidationProps,
} from '@/components/marketplace/createListing/ParameterForm';
import ImageUploadForm, {
  ImageProps,
} from '@/components/marketplace/createListing/ImageUploadForm';
import CategoryForm, { CategoryProps } from '@/components/marketplace/createListing/CategoryForm';
import { PostListingsRequestBody } from '@/utils/api/server/zod/listings';
import OnLeaveModal from '@/components/modal/OnLeaveModal';
import OnCreateModal from '@/components/modal/OnCreateModal';
import { useQuery } from 'react-query';

// validation
import fetchCategories from '@/middlewares/fetchCategories';
import fetchParameters from '@/middlewares/fetchParameters';
import createListing from '@/middlewares/createListing';

// Hooks
const useGetCategoriesQuery = () => {
  const { data } = useQuery('categories', () => fetchCategories());

  return data;
};

// run this query when category is selected
const useGetParametersQuery = (ids: string, category: CategoryProps | null) => {
  const { data } = useQuery(['parameters', ids, category], () => fetchParameters(ids), {
    enabled: ids !== '' || category !== null,
  });

  return data;
};

const usePostListingQuery = (listing: PostListingsRequestBody | undefined) => {
  const { data } = useQuery(['postListing', listing], () => createListing(listing), {
    enabled: listing !== undefined,
  });
  return data;
};

const CreateListingPage = () => {
  // form data
  const [listingType, setListingType] = useState<ListingTypeProps>('BUY');
  const [category, setCategory] = useState<CategoryProps | null>(null);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [parameters, setParameters] = useState<ParameterFormProps[]>([]);
  const [parameterIDs, setParameterIDs] = useState<string>('');
  const [categoryParameters, setCategoryParameters] = useState<CategoryParametersProps[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [unitPrice, setUnitPrice] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [formData, setFormData] = useState<PostListingsRequestBody>();

  // modals
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

  // validation
  const [categoryError, setCategoryError] = useState<string>('');
  const [parameterErrors, setParameterErrors] = useState<ParameterValidationProps[]>([]);
  const [listingErrors, setListingErrors] = useState<ListingValidationProps>({
    nameError: '',
    descriptionError: '',
    priceError: '',
  });

  // Hooks
  const categoriesData = useGetCategoriesQuery();
  const parametersData = useGetParametersQuery(parameterIDs, category);
  const postListingData = usePostListingQuery(formData);

  if (postListingData) {
    setOpenCreateModal(true);
  }

  const sortCategoryParameters = async () => {
    const parameterIds: string[] = [];
    const categoryParameters: CategoryParametersProps[] = [];

    if (category != null) {
      category.parameters.forEach((parameter) => {
        const { parameterId } = parameter;
        parameterIds.push(parameterId);
        categoryParameters.push(parameter);
      });

      const parameterIdsString = parameterIds.toString();

      setCategoryParameters(categoryParameters);
      setParameterIDs(parameterIdsString);
    }
  };

  // validation for listing form
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
    }

    if (!formIsValid) {
      setListingErrors(newErrors);
    }

    return formIsValid;
  };

  // validation for parameters
  const parameterValidation = () => {
    let formIsValid = true;
    const newParameterErrors: ParameterValidationProps[] = [];

    categoryParameters.forEach((categoryParameter) => {
      const { parameterId, required } = categoryParameter;
      const parameter = parameters.find((parameter) => parameter.paramId === Number(parameterId));

      if (parametersData) {
        const detailedParameter = parametersData.find((parameter) => parameter.id === parameterId);

        if (!detailedParameter) {
          return;
        }

        if (!parameter && required) {
          newParameterErrors.push({
            parameterId,
            error: `${detailedParameter.displayName} is required`,
          });
        }

        if (!parameter) {
          return;
        }

        switch (detailedParameter.dataType) {
          case 'number':
            if (!Number.isNaN(parameter.value)) {
              newParameterErrors.push({
                parameterId,
                error: `${detailedParameter.displayName} must be a number`,
              });
            }
            break;
          case 'boolean':
            if (typeof parameter.value !== 'boolean') {
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

    if (newParameterErrors.length > 0) {
      formIsValid = false;
    }

    return formIsValid;
  };

  // Handle Submit/Cancel

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // reset errors
    setCategoryError('');
    setParameterErrors([]);
    setListingErrors({
      nameError: '',
      descriptionError: '',
      priceError: '',
    });

    if (!category || !category.id) {
      setCategoryError('Category is required');
      return;
    }

    if (!listingValidation() && !parameterValidation()) {
      return;
    }

    // backend api currently have conflicts
    const sendingData: PostListingsRequestBody = {
      name: title,
      description,
      price,
      unitPrice,
      negotiable,
      categoryId: Number(category.id),
      type: listingType,
      multiple: false,
      parameters,
    };

    if (sendingData !== undefined) {
      setFormData(sendingData);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenCancelModal(true);
  };

  // Use Effects

  useEffect(() => {
    sortCategoryParameters();
  }, [category, parameterIDs]);

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
          {categoriesData && (
            <CategoryForm setCategory={setCategory} data={categoriesData} error={categoryError} />
          )}
          <ImageUploadForm setImages={setImages} />
          {category && parametersData && (
            <ParameterForm
              setParameters={setParameters}
              data={parametersData}
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
            <OnCreateModal open={openCreateModal} setOpen={setOpenCreateModal} />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateListingPage;
