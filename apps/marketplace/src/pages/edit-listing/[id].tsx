import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Container, Divider, Grid, Button } from '@mui/material';
import { PutListingsRequestBody } from '@/utils/api/server/zod/listings';
import { useQueries, useQuery } from 'react-query';
import { ReturnType } from '@/middlewares/createListing';
import editListing from '@/middlewares/editListing';
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
import ImageUploadForm, {
  ImageOrder,
  PreviewImageProps,
} from '@/components/marketplace/createListing/ImageUploadForm';
import fetchListing from '@/middlewares/fetchListing';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const usePutListingQuery = (
  id: string,
  listing: { listingBody: PutListingsRequestBody; images: Blob[] } | undefined,
  imagesOrder: ImageOrder,
  deletedImages: string[],
  onSucessCallback: (data: ReturnType) => void
) => {
  const { data } = useQuery(
    ['editListing', listing],
    () => editListing(id, listing?.listingBody, listing?.images, imagesOrder, deletedImages),
    {
      enabled:
        id !== undefined &&
        id.trim() !== '' &&
        listing !== undefined &&
        listing.listingBody !== undefined &&
        listing.images !== undefined,
      onSuccess: (data) => onSucessCallback(data),
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

  // ** TODO: optimise in the future to use useReducer hook
  // form data
  const [formData, setFormData] = useState<{
    listingBody: PutListingsRequestBody;
    images: Blob[];
  }>();

  //
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

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

  const [listingImages, setListingImages] = useState<PreviewImageProps[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [imageOrder, setImageOrder] = useState<ImageOrder>({});

  // to keep track of original order of image
  const [originalOrder, setOriginalOrder] = useState<ImageOrder>({});

  // errors
  const [categoryError, setCategoryError] = useState<string>('');
  const [parameterErrors, setParameterErrors] = useState<ParameterValidationProps[]>([]);
  const [listingErrors, setListingErrors] = useState<ListingValidationProps>({
    nameError: '',
    descriptionError: '',
    priceError: '',
  });

  // Hooks
  const editListingData = usePutListingQuery(
    id as string,
    formData,
    imageOrder,
    deletedImages,
    (data) => {
      if (data === false) return;
      setOpenCreateErrorModal(!data.success);
      setOpenCreateModal(data.success);
    }
  );

  const queries = useQueries([
    { queryKey: 'categories', queryFn: () => fetchCategories(true) },
    { queryKey: 'parameters', queryFn: () => fetchParameters() },
    {
      queryKey: 'listing',
      queryFn: () => fetchListing(id as string),
      enabled: id !== undefined && (id as string).trim() !== '',
    },
  ]);
  const categoriesData = queries[0].data;
  const allParametersData = queries[1].data;
  const listing = queries[2].data;
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
    const listingBody: PutListingsRequestBody = {
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

  const deleteImage = (id: string) => {
    setDeletedImages((prev) => [...prev, originalOrder[id].toString()]);
  };

  // Use Effects
  useEffect(() => {
    if (category == null) return;
    setCategoryParameters(category.parameters || []);
  }, [category]);

  // check if the user is admin or owner of the listing or from the same company
  useEffect(() => {
    if (!session || !listing) return;
    if (
      session.user.permissions !== 1 &&
      session.user.id !== listing.owner.id &&
      session.user.companyId !== listing.owner.company.id
    ) {
      router.push('/404.tsx');
    }
  }, [session, listing]);

  // fill the form with data
  useEffect(() => {
    if (listing) {
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

      // Set Image Data
      if (listing.images) {
        const order: ImageOrder = {};
        const previewImages: PreviewImageProps[] = [];
        listing.images.forEach((image, index) => {
          order[image] = index;
          previewImages.push({
            key: image,
            id: image,
            preview: `https://siwma-marketplace.s3.ap-southeast-1.amazonaws.com/${image}`,
          });
        });
        setOriginalOrder(order);
        setListingImages(previewImages);
      }
    }
  }, [listing]);

  // Handle Submit/Cancel
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
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
              Edit Listing
            </Typography>
            <Typography variant="body1">Edit a listing to be shared on your profile.</Typography>
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Divider />
          </Grid>
          <ListingTypeForm listingType={listingType} setListingType={setListingType} disabled />
          {categoriesData && (
            <CategoryForm
              category={category}
              setCategory={setCategory}
              data={categoriesData}
              error={categoryError}
            />
          )}
          <ImageUploadForm
            listingImages={listingImages}
            setImages={setImages}
            images={images}
            setImageOrder={setImageOrder}
            deleteImage={deleteImage}
          />
          {category && parametersData && (
            <ParameterForm
              parameters={parameters}
              setParameters={setParameters}
              crossSectionImg={category.crossSectionImage}
              data={parametersData}
              errors={parameterErrors}
            />
          )}
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
              EDIT LISTING
            </Button>
            {editListingData !== false &&
              (editListingData.success ? (
                <OnCreateModal
                  open={openCreateModal}
                  setOpen={setOpenCreateModal}
                  listingID={editListingData.id}
                  title="Successfully edited listing!"
                />
              ) : (
                <OnCreateErrorModal
                  open={openCreateErrorModal}
                  setOpen={setOpenCreateErrorModal}
                  content={editListingData.errorMessages}
                  title="Error occured when editing listing."
                />
              ))}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateListingPage;
