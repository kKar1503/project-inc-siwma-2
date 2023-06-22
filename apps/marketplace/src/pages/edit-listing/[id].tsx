import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// components
import { Listing } from '@/utils/api/client/zod/listings';
import { PutListingsRequestBody } from '@/utils/api/server/zod/listings';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// hooks
import useModals from '@/components/marketplace/createListing/useModals';
import useForms from '@/components/marketplace/createListing/useForms';

// middleware
import fetchListing from '@/middlewares/fetchListing';
import editListing from '@/middlewares/editListing';
import { Order, PreviewImageProps } from '@/components/marketplace/createListing/ImageUploadForm';

const useGetListingQuery = (id: string) => {
  const { data } = useQuery(['listing', id], async () => fetchListing(id), {
    enabled: id !== undefined && id.trim() !== '',
  });

  return data;
};

const useEditListingQuery = (
  id: string,
  listing: { listingBody: PutListingsRequestBody; images: Blob[] } | undefined,
  previousData: Listing | undefined,
  imagesOrder: Order,
  deletedImages: string[]
) => {
  const { data } = useQuery(
    ['putListing', listing],
    () => editListing(id, listing?.listingBody, listing?.images, imagesOrder, deletedImages),
    {
      enabled:
        id !== undefined &&
        id.trim() !== '' &&
        listing !== undefined &&
        previousData !== undefined &&
        listing.listingBody !== undefined &&
        listing.listingBody !== previousData &&
        listing.images !== undefined,
    }
  );

  if (data === undefined) return false;

  return data;
};

const CreateListingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSession();

  // modals

  const { editModal, cancelModal } = useModals();

  // form data

  const {
    forms,
    formData,
    setFormData,
    submitForm,
    setDisabled,
    setListingImages,
    imagesOrder,
    deletedImages,
  } = useForms();

  // Hooks

  const listingData = useGetListingQuery(id as string);

  const editListingData = useEditListingQuery(
    id as string,
    formData,
    listingData,
    imagesOrder.order,
    deletedImages
  );

  // check if the user editing is the owner or an admin
  useEffect(() => {
    if (!data || !listingData) return;
    if (data?.user.permissions !== 1 && data?.user.id !== listingData?.owner.id) router.back();
  }, [listingData, data, router]);

  // setListingData
  useEffect(() => {
    if (listingData) {
      // Disable form
      setDisabled(true);

      // Set Form Data
      setFormData({ listingBody: listingData, images: [] });

      // Set Image Data
      if (listingData.images) {
        const previewImages: PreviewImageProps[] = [];
        listingData.images.forEach((image) => {
          previewImages.push({
            id: image.id,
            preview: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${image}`,
          });
        });
        setListingImages(previewImages);
      }
    }
  }, [listingData, setDisabled, setFormData, setListingImages]);

  // open modal if successful
  useEffect(() => {
    if (editListingData) {
      editModal.open(true);
    }
  }, [editListingData]);

  // Handle Submit/Cancel

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cancelModal.open(true);
  };

  return (
    <Container maxWidth="lg" sx={{ boxShadow: 4, padding: 2, marginTop: 2, marginBottom: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Edit Listing
            </Typography>
            <Typography variant="body1">
              Edit a buy or a sell listing to be shared on your profile.
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Divider />
          </Grid>

          {forms}

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
              Cancel
            </Button>
            {cancelModal.element}
          </Grid>
          <Grid item xs={6} md={6} sx={{ width: '100%' }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              Edit LISTING
            </Button>
            {editModal.element}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateListingPage;
