import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// components
import { PostListingsRequestBody } from '@/utils/api/server/zod/listings';
import { useQuery } from 'react-query';

// post listing
import createListing from '@/middlewares/createListing';

// hooks
import useModals from '@/components/marketplace/createListing/useModals';
import useForms from '@/components/marketplace/createListing/useForms';

const usePostListingQuery = (
  listing: { listingBody: PostListingsRequestBody; images: Blob[] } | undefined,
) => {
  const { data } = useQuery(['postListing', listing], () => createListing(listing?.listingBody, listing?.images), {
    enabled:
      listing !== undefined && listing.listingBody !== undefined && listing.images !== undefined,
  });

  if (data === undefined) return false;

  return data;
};

const CreateListingPage = () => {
  // modals
  const { createModal, cancelModal } = useModals();

  // form data
  const { forms, formData, submitForm } = useForms();

  // Hooks
  const postListingData = usePostListingQuery(formData);

  useEffect(() => createModal.open(postListingData), [createModal, postListingData]);

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
    <Container maxWidth='lg' sx={{ boxShadow: 4, padding: 2, marginTop: 2, marginBottom: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Create Listing
            </Typography>
            <Typography variant='body1'>
              Create a buy or a sell listing to be shared on your profile.
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Divider />
          </Grid>

          {forms}

          <Grid item xs={6} md={6} sx={{ width: '100%' }}>
            <Button
              variant='contained'
              type='submit'
              size='large'
              onClick={handleCancel}
              sx={({ palette }) => ({
                backgroundColor: palette.error.main,
              })}
              fullWidth
            >
              Cancel Listing
            </Button>
            {cancelModal.element}
          </Grid>
          <Grid item xs={6} md={6} sx={{ width: '100%' }}>
            <Button variant='contained' type='submit' size='large' fullWidth>
              CREATE LISTING
            </Button>
            {createModal.element}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateListingPage;
