import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ListingTypeForm from '@/components/marketplace/createListing/ListingTypeForm';
import ListingForm from '@/components/marketplace/createListing/ListingForm';
import ParameterForm, {
  ParameterFormProps,
} from '@/components/marketplace/createListing/ParameterForm';
import ImageUploadForm, {
  ImageProps,
} from '@/components/marketplace/createListing/ImageUploadForm';
import CategoryForm from '@/components/marketplace/createListing/CategoryForm';
import OnLeaveModal from '@/components/modal/OnLeaveModal';

const CreateListingPage = () => {
  const [listingType, setListingType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [images, setImages] = useState<ImageProps[]>([]);
  const [parameters, setParameters] = useState<ParameterFormProps[]>([]);
  const [price, setPrice] = useState<number>();
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [unitPrice, setUnitPrice] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(`Listing Type: ${listingType}`);
    console.log(`Category: ${category}`);
    console.log(`Images: ${images}`);
    console.log(`Parameters: ${parameters}`);
    console.log(`Price: ${price}`);
    console.log(`Negotiable: ${negotiable}`);
    console.log(`Unit Price: ${unitPrice}`);
    console.log(`Title: ${title}`);
    console.log(`Description: ${description}`);
  }, [listingType, category, images, parameters, price, negotiable, unitPrice, title, description]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // implement form submission logic here
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          boxShadow={5}
          alignContent="center"
          display="flex"
          position="relative"
          padding="1rem"
          margin="1rem"
        >
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Create Listing
            </Typography>
          </Grid>
          <Grid item xs={10} md={10} justifyContent="flex-start" sx={{ width: '100%' }}>
            <Typography variant="body1">
              Create a buy or a sell listing to be shared on your profile.
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} justifyContent="flex-end" sx={{ width: '100%' }}>
            <Button variant="contained" type="submit" onClick={handleCancel}>
              Cancel Listing
            </Button>
            <OnLeaveModal open={open} setOpen={setOpen} />
          </Grid>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Divider />
          </Grid>

          <ListingTypeForm setListingType={setListingType} />
          <CategoryForm setCategory={setCategory} />
          <ImageUploadForm setImages={setImages} />
          <ParameterForm setParameters={setParameters} category={category} />
          <ListingForm
            setTitle={setTitle}
            setPrice={setPrice}
            setNegotiable={setNegotiable}
            setUnitPrice={setUnitPrice}
            setDescription={setDescription}
          />

          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Button variant="contained" type="submit" fullWidth sx={{ mt: '1rem' }}>
              CREATE LISTING
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateListingPage;
