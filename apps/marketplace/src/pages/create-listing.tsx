import React, { useEffect, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { PostListingsRequestBody } from '@/utils/api/server/zod/listings';
import { useQueries, useQuery } from 'react-query';
import createListing from '@/middlewares/createListing';
import fetchCategories from '@/middlewares/fetchCategories';
import OnCreateModal from '@/components/modal/OnCreateModal';
import OnCreateErrorModal from '@/components/modal/OnCreateErrorModal';
import OnLeaveModal from '@/components/modal/OnLeaveModal';
import CategoryForm, { CategoryProps } from '@/components/marketplace/createListing/CategoryForm';
import fetchParameters from '@/middlewares/fetchParameters';
import ParameterForm, {
  CategoryParametersProps,
  ParameterFormProps,
  ParameterValidationProps,
} from '@/components/marketplace/createListing/ParameterForm';
import ListingTypeForm, {
  ListingTypeProps,
} from '@/components/marketplace/createListing/ListingTypeForm';
import ListingForm, {
  ListingValidationProps,
} from '@/components/marketplace/createListing/ListingForm';
import ImageUploadForm from '@/components/marketplace/createListing/ImageUploadForm';

const usePostListingQuery = (
  listing: { listingBody: PostListingsRequestBody; images: Blob[] } | undefined
) => {
  const { data } = useQuery(
    ['postListing', listing],
    () => createListing(listing?.listingBody, listing?.images),
    {
      enabled:
        listing !== undefined && listing.listingBody !== undefined && listing.images !== undefined,
      retry: false,
    }
  );

  if (data === undefined) return false;

  return data;
};

const CreateListingPage = () => {
  // modals
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openCreateErrorModal, setOpenCreateErrorModal] = useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

  // form data
  const [formData, setFormData] = useState<{
    listingBody: PostListingsRequestBody;
    images: Blob[];
  }>();

  // form data (parts)
  const [listingType, setListingType] = useState<ListingTypeProps>('BUY');
  const [category, setCategory] = useState<CategoryProps | null>(null);
  const [images, setImages] = useState<Blob[]>([]);
  const [parameters, setParameters] = useState<ParameterFormProps[]>([]);
  const [categoryParameters, setCategoryParameters] = useState<CategoryParametersProps[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [unitPrice, setUnitPrice] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // errors
  const [categoryError, setCategoryError] = useState<string>('');
  const [parameterErrors, setParameterErrors] = useState<ParameterValidationProps[]>([]);
  const [listingErrors, setListingErrors] = useState<ListingValidationProps>({
    nameError: '',
    descriptionError: '',
    priceError: '',
  });

  // Hooks
  const postListingData = usePostListingQuery(formData);
  const queries = useQueries([
    { queryKey: 'categories', queryFn: () => fetchCategories() },
    { queryKey: 'parameters', queryFn: () => fetchParameters() },
  ]);
  const categoriesData = queries[0].data;
  const allParametersData = queries[1].data;
  const parametersData = useMemo(() => {
    if (!allParametersData) return undefined;
    return categoryParameters.map(
      (categoryParameter) => allParametersData[categoryParameter.parameterId]
    );
  }, [allParametersData, categoryParameters]);

  // validation
  const categoryValidation = () => {
    if (category && category.id) return true;
    setCategoryError('Category is required');
    return false;
  };

  const parameterValidation = () => {
    let formIsValid = true;
    const newParameterErrors: ParameterValidationProps[] = [];

    categoryParameters.forEach((categoryParameter) => {
      const { parameterId, required } = categoryParameter;
      const parameter = parameters.find((parameter) => parameter.paramId === parameterId);

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
            if (
              typeof parseFloat(parameter.value) !== 'number' ||
              parameter.value.includes('!') ||
              parameter.value.includes(' ')
            ) {
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
    } else if (typeof price !== 'number') {
      newErrors.priceError = 'Price must be a number';
      formIsValid = false;
    }

    if (!formIsValid) {
      setListingErrors(newErrors);
    }

    return formIsValid;
  };

  // reset errors
  const resetCategoryErrors = () => {
    setCategoryError('');
  };
  const resetParameterErrors = () => {
    setParameterErrors([]);
  };
  const resetListingErrors = () => {
    setListingErrors({
      nameError: '',
      descriptionError: '',
      priceError: '',
    });
  };

  // final validation
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
    const listingBody: PostListingsRequestBody = {
      name: title,
      description,
      price,
      unitPrice,
      negotiable,
      multiple: false,
      categoryId: category?.id || '',
      parameters,
      type: listingType,
    };

    if (!validateForm()) return false;

    setFormData({
      listingBody,
      images,
    });
    return true;
  };

  // Use Effects
  useEffect(() => {
    if (category == null) return;
    setCategoryParameters(category.parameters || []);
  }, [category]);

  // Handle Submit/Cancel
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = submitForm();

    if (validated) {
      if (typeof postListingData === 'boolean') {
        setOpenCreateModal(postListingData);
      } else {
        setOpenCreateErrorModal(true);
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenCancelModal(true);
  };

  return (
    <Container maxWidth="lg" sx={{ boxShadow: 4, p: 2, my: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Create Listing
            </Typography>
            <Typography variant="body1">
              Create a buy or a sell listing to be shared on your profile.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
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
          <Grid item xs={6} sx={{ width: '100%' }}>
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
          <Grid item xs={6} sx={{ width: '100%' }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              CREATE LISTING
            </Button>
            {postListingData !== false &&
              (typeof postListingData === 'boolean' ? (
                <OnCreateModal open={openCreateModal} setOpen={setOpenCreateModal} />
              ) : (
                <OnCreateErrorModal
                  open={openCreateErrorModal}
                  setOpen={setOpenCreateErrorModal}
                  content={postListingData}
                />
              ))}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateListingPage;
