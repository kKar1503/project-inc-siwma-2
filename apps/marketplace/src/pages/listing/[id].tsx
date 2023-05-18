import Head from 'next/head';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ReactNode, useState, SyntheticEvent } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import DetailedListingCarousel, {
  DetailedListingCarouselProps,
} from '@/components/marketplace/carousel/DetailedListingCarousel';
import { Paper, Typography } from '@mui/material';

// eslint-disable-next-line no-unused-vars

// test data for carousel component
const detailListingData = [
  {
    id: 1,
    name: 'Company A',
    description: 'Listing description',
    price: 300,
    unitPrice: false,
    negotiable: true,
    categoryId: '1',
    type: 'SELL',
    owner: {
      id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
      name: 'Elon Musk',
      email: 'elon.musk@example.com',
      company: {
        id: '1',
        name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
        website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
        bio: 'Owner bio',
        image: '',
        visible: true,
      },
      profilePic: null,
      mobileNumber: '69694202',
      contactMethod: 'email',
      bio: null,
    },
    active: true,
    parameter: [
      {
        paramId: '3',
        value: 200,
      },
      {
        paramId: '2',
        value: 300,
      },
    ],
  },

  {
    id: 2,
    name: 'Company B',
    description: 'Listing description',
    price: 300,
    unitPrice: false,
    negotiable: true,
    categoryId: '1',
    type: 'SELL',
    owner: {
      id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
      name: 'Elon Musk',
      email: 'elon.musk@example.com',
      company: {
        id: '1',
        name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
        website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
        bio: 'Owner bio',
        image: '',
        visible: true,
      },
      profilePic: null,
      mobileNumber: '69694202',
      contactMethod: 'email',
      bio: null,
    },
    active: true,
    parameter: [
      {
        paramId: '3',
        value: 200,
      },
      {
        paramId: '2',
        value: 300,
      },
    ],
  },

  {
    id: 3,
    name: 'Compnay C',
    description: 'Listing description',
    price: 300,
    unitPrice: false,
    negotiable: true,
    categoryId: '1',
    type: 'SELL',
    owner: {
      id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
      name: 'Elon Musk',
      email: 'elon.musk@example.com',
      company: {
        id: '1',
        name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
        website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
        bio: 'Owner bio',
        image: '',
        visible: true,
      },
      profilePic: null,
      mobileNumber: '69694202',
      contactMethod: 'email',
      bio: null,
    },
    active: true,
    parameter: [
      {
        paramId: '3',
        value: 200,
      },
      {
        paramId: '2',
        value: 300,
      },
    ],
  },

  {
    id: 4,
    name: 'Company D',
    description: 'Listing description',
    price: 300,
    unitPrice: false,
    negotiable: true,
    categoryId: '1',
    type: 'SELL',
    owner: {
      id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
      name: 'Elon Musk',
      email: 'elon.musk@example.com',
      company: {
        id: '1',
        name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
        website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
        bio: 'Owner bio',
        image: '',
        visible: true,
      },
      profilePic: null,
      mobileNumber: '69694202',
      contactMethod: 'email',
      bio: null,
    },
    active: true,
    parameter: [
      {
        paramId: '3',
        value: 200,
      },
      {
        paramId: '2',
        value: 300,
      },
    ],
  },
];

const carouselData = [
  {
    id: '4f18716b-ba33-4a98-9f9c-88df0ce50f51',
    fileName: 'myimage-20230322T120000Z.jpg',
    url: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    id: 'f45c0d48-b93e-45aa-8e33-7d9d3f1c4397',
    fileName: 'myotherimage-20230321T080000Z.jpg',
    url: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    id: '8b63d6f4-6d58-4f2c-b2f3-33d156ee3c4e',
    fileName: 'myotherimage2-20230321T080000Z.jpg',
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
];

export interface ListingData {
  id: number;
  name: string;
  description: string;
  price: number;
  unitPrice: boolean;
  negotiable: boolean;
  categoryId: string;
  type: string;
  owner: {
    id: string;
    name: string;
    email: string;
    company: {
      id: string;
      name: string;
      website: string;
      bio: string;
      image: '';
      visible: boolean;
    };
    profilePic: null;
    mobileNumber: string;
    contactMethod: string;
    bio: null;
  };
  active: boolean;
  parameter: [
    {
      paramId: string;
      value: number;
    },
    {
      paramId: string;
      value: number;
    }
  ];
}

export type CategoryPageProps = {
  data: ListingData[];
};

export const getServerSideProps = async ({ query }: { query: any }) => {
  // api call to get user details go here
  // if user does not exist, return error code and redirect to wherever appropriate

  const { id } = query;
  if (!Number.isInteger(parseFloat(id))) {
    // Redirect to the index page
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  // just for testing purposes
  if (id > detailListingData.length) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const data = detailListingData[id - 1];
  const serverSideListings = carouselData;

  return {
    props: {
      data,
      serverSideListings,
    },
  };
};

// const TabPanel = (props: TabPanelProps) => {
//   const { children, value, index, height, ...other } = props;

//   return (
//     <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} {...other}>
//       {value === index && (
//         <Box sx={{ p: 3, height: { height }, overflowY: 'auto' }}>{children}</Box>
//       )}
//     </div>
//   );
// };

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 60,
  bgcolor: theme.palette.common.white,
  color: theme.palette.primary[400],
  border: 1,
  borderColor: theme.palette.primary[400],
  borderRadius: theme.shape.borderRadius,
  //   for some reason, half of this doesn't work??
  //   upon further investigation seems like it's more specifically the ones regarding border, including the styles above
  '&.Mui-selected': {
    minHeight: 60,
    color: theme.palette.common.white,
    bgcolor: theme.palette.primary[400],
    border: 1,
    borderColor: theme.palette.primary[400],
    borderRadius: theme.shape,
  },
}));

const DetailedListingPage = ({
  data,
}: // serverSideListings,
{
  data: DetailedListingCarouselProps;
  // serverSideListings: carouselData[];
}) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  // when filter/sorts are called use set states to set the new listings/reviews again
  // const [listings, setListings] = useState(serverSideListings);

  return (
    <>
      <Head>
        <title>{data.name}&lsquo;s Listings</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={({ spacing }) => ({
            pt: spacing(3),
            pl: '160px',
            pr: '160px',
            pb: spacing(3),
            height: '100vh;',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          {/* <DetailedListingCarousel data={data} /> */}
          <Box
            sx={{
              width: '73%',
              height: 'full',
              bgcolor: theme.palette.common.white,
              borderRadius: theme.shape,
            }}
          >
            <Paper>
              <Typography>Hello</Typography>
            </Paper>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default DetailedListingPage;
