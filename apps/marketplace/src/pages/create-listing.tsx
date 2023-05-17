import React, { useState } from 'react';
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
  ParameterFormProps,
  ParameterProps,
} from '@/components/marketplace/createListing/ParameterForm';
import ImageUploadForm, {
  ImageProps,
} from '@/components/marketplace/createListing/ImageUploadForm';
import CategoryForm, { CategoryProps } from '@/components/marketplace/createListing/CategoryForm';
import OnLeaveModal from '@/components/modal/OnLeaveModal';

export type CreateListingProps = {
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
};

// test data
const categoryData: CategoryProps[] = [
  {
    id: '1',
    name: 'Category1 Name',
    description: 'Description1',
    image: '132990fc-e5a1-4154-88e9-61102de1ea33',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
    parameters: [
      {
        parameterId: '1',
        required: true,
      },
      {
        parameterId: '2',
        required: false,
      },
      {
        parameterId: '4',
        required: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Category2 Name',
    description: 'Description2',
    image: '5b41acd4-4c77-4f32-ab78-2192b451b1f8',
    crossSectionImage: '57b6ddfe-6f21-463f-ba0c-16f6b88c3162',
    active: false,
    parameters: [
      {
        parameterId: '1',
        required: true,
      },
      {
        parameterId: '2',
        required: true,
      },
      {
        parameterId: '3',
        required: false,
      },
    ],
  },
];

const parameterData: ParameterProps[] = [
  {
    id: '1',
    name: 'weight',
    displayName: 'Weight',
    type: 'WEIGHT',
    dataType: 'NUMBER',
  },
  {
    id: '2',
    name: 'dimension',
    displayName: 'Dimension',
    type: 'DIMENSION',
    dataType: 'NUMBER',
  },
  {
    id: '3',
    name: 'dimension2',
    displayName: 'Dimension2',
    type: 'DIMENSION',
    dataType: 'NUMBER',
  },
  {
    id: '4',
    name: 'color',
    displayName: 'Color',
    type: 'TWO_CHOICES',
    dataType: 'STRING',
    options: ['Red', 'Blue'],
  },
  {
    id: '5',
    name: 'size',
    displayName: 'Size',
    type: 'MANY_CHOICES',
    dataType: 'STRING',
    options: ['Small', 'Medium', 'Large'],
  },
  {
    id: '6',
    name: 'description',
    displayName: 'Description',
    type: 'OPEN_ENDED',
    dataType: 'STRING',
  },
];

export const getServerSideProps = async ({ query }: any) => {
  // ids is the parameter ids
  // includeParameters is a boolean to include the parameters in the response when getting categories
  const { ids, includeParameters } = query;

  const data = categoryData;
  const parametersData = parameterData;

  return {
    props: {
      data,
      parametersData,
    },
  };
};

const CreateListingPage = ({
  data,
  parametersData,
}: {
  data: CategoryProps[];
  parametersData: ParameterProps[];
}) => {
  const [listingType, setListingType] = useState<ListingTypeProps>('BUY');
  const [category, setCategory] = useState<CategoryProps | null>(null);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [parameters, setParameters] = useState<ParameterFormProps[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [unitPrice, setUnitPrice] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: CreateListingProps = {
      name: title,
      description,
      price,
      unitPrice,
      negotiable,
      categoryId: category?.id || '',
      listingType,
      images,
      coverImage: null,
      parameters,
    };

    console.log(formData);

    // send form data to backend
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
            <OnLeaveModal open={open} setOpen={setOpen} />
          </Grid>
          <Grid item xs={12} md={12} sx={{ width: '100%' }}>
            <Divider />
          </Grid>

          <ListingTypeForm setListingType={setListingType} />
          <CategoryForm setCategory={setCategory} data={data} />
          <ImageUploadForm setImages={setImages} />
          <ParameterForm setParameters={setParameters} data={parametersData} />
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
