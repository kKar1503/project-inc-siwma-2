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
import ListingForm from '@/components/marketplace/createListing/ListingForm';
import ParameterForm, {
  CategoryParametersProps,
  ParameterFormProps,
  ParameterProps,
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
  const [price, setPrice] = useState<number>(0);
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [unitPrice, setUnitPrice] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const sortCategoryParameters = async () => {
    const categoryParameters: string[] = [];

    if (category != null) {
      // id, required
      category.parameters.forEach((parameter) => {
        const { parameterId } = parameter;
        categoryParameters.push(parameterId);
      });

      const { data } = await client.get(`/v1/parameters?ids=${categoryParameters}`);

      setParameters(data.data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category || !category.id) {
      setError('Please select a category');
      return;
    }

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
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} boxShadow={5} display="flex" position="relative">
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
            <Button
              variant="contained"
              type="submit"
              onClick={handleCancel}
              sx={({ palette }) => ({
                backgroundColor: palette.error.main,
              })}
            >
              Cancel Listing
            </Button>
            <OnLeaveModal open={openCancelModal} setOpen={setOpenCancelModal} />
          </Grid>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Divider />
          </Grid>

          <ListingTypeForm setListingType={setListingType} />
          <CategoryForm setCategory={setCategory} data={data} />
          <ImageUploadForm setImages={setImages} />
          {category && <ParameterForm setParameters={setParameters} data={[]} />}
          <ListingForm
            setTitle={setTitle}
            setPrice={setPrice}
            setNegotiable={setNegotiable}
            setUnitPrice={setUnitPrice}
            setDescription={setDescription}
          />

          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            {error && (
              <Typography variant="body1" color="error" sx={{ mb: '1rem' }}>
                {error}
              </Typography>
            )}
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
