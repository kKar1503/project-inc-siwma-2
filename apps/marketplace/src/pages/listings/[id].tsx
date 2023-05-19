import Box from '@mui/material/Box';
import { ReactNode, useState, SyntheticEvent } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import DetailedListingCarousel, {
  DetailedListingCarouselProps,
} from '@/components/marketplace/carousel/DetailedListingCarousel';
import { Divider, Grid, Typography } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ChatNow from '@/components/marketplace/listing/ChatNow';
import SellBadge from '@/components/marketplace/listing/SellBadge';
import BuyBadge from '@/components/marketplace/listing/BuyBadge';

// Test Data for listing details
const detailedListingData = [
  {
    id: 1,
    name: 'Item A',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed bibendum erat. Etiam malesuada, massa non blandit mattis, lacus mi dignissim nisl, non lacinia lectus sapien non mi. Vivamus nisi leo, auctor a urna vitae, aliquet consequat nisi. In quis dolor urna. Maecenas id mauris ultrices, bibendum neque lacinia, euismod felis. ',
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
    name: 'Item B',
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
    name: 'Item C',
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
    name: 'Item D',
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

// test data for carousel component
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

// test data for categories
const categoryData = [
  {
    id: '1',
    name: 'Cat 1',
    description: 'Description2',
    image: '5b41acd4-4c77-4f32-ab78-2192b451b1f8',
    crossSectionImage: '57b6ddfe-6f21-463f-ba0c-16f6b88c3162',
    active: true,
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

  {
    id: '2',
    name: 'Cat 2',
    description: 'Description2',
    image: '5b41acd4-4c77-4f32-ab78-2192b451b1f8',
    crossSectionImage: '57b6ddfe-6f21-463f-ba0c-16f6b88c3162',
    active: true,
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

  {
    id: '3',
    name: 'Cat 3',
    description: 'Description2',
    image: '5b41acd4-4c77-4f32-ab78-2192b451b1f8',
    crossSectionImage: '57b6ddfe-6f21-463f-ba0c-16f6b88c3162',
    active: true,
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

export type DetailedListingProps = {
  data: ListingData;
};

export const getServerSideProps = async ({ query }: { query: any }) => {
  // api call to get listing details go here

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
  if (id > detailedListingData.length) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  // const data = carouselData;
  const data = detailedListingData[id - 1];

  data.parameter.sort((a, b) => {
    if (a.paramId < b.paramId) {
      return -1;
    }
    if (a.paramId > b.paramId) {
      return 1;
    }
    return 0;
  });

  return {
    props: {
      data,
      // serverSideListings,
    },
  };
};

const DetailedListingPage = ({ data }: DetailedListingProps) => {
  const theme = useTheme();

  return (
    <main>
      <Box sx={{ height: '100%', width: '100%', bgcolor: theme.palette.common.white }}>
        <DetailedListingCarousel data={carouselData} />
        <Box
          sx={{
            width: '70%',
            height: 'full',
            mr: 'auto',
            ml: 'auto',
          }}
        >
          <Grid container columns={12} sx={{ direction: 'row' }}>
            <Grid item xs={8}>
              <Grid
                container
                columns={12}
                sx={{
                  direction: 'row',
                }}
              >
                <Grid item xs={10}>
                  <Grid
                    container
                    sx={({ spacing }) => ({
                      directon: 'row',
                      pt: spacing(2),
                      pb: spacing(2),
                      pl: spacing(2),
                    })}
                  >
                    <Box>
                      {data.type === 'BUY' && <BuyBadge />}
                      {data.type === 'SELL' && <SellBadge />}
                    </Box>
                    <Typography
                      sx={({ spacing }) => ({
                        fontWeight: 600,
                        pl: spacing(2),
                      })}
                      variant="h6"
                    >
                      {data.name}
                    </Typography>
                  </Grid>

                  <Typography
                    sx={({ spacing }) => ({
                      fontWeight: 700,
                      pl: spacing(2),
                      pb: spacing(2),
                    })}
                    variant="h5"
                  >
                    S${data.price}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={({ spacing }) => ({
                    pt: spacing(2),
                    pr: spacing(2),
                  })}
                >
                  <Grid container sx={{ direction: 'row' }}>
                    <Grid item xs={6}>
                      <IosShareOutlinedIcon sx={{ fontSize: 30 }} />
                    </Grid>
                    <Grid item xs={6}>
                      <BookmarkBorderOutlinedIcon sx={{ fontSize: 30 }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Divider variant="middle" />

              <Typography
                sx={({ spacing }) => ({
                  pt: spacing(2),
                  pl: spacing(2),
                  fontWeight: 600,
                })}
                variant="h6"
              >
                Description
              </Typography>
              <Box
                sx={({ spacing }) => ({
                  mt: 1,
                  pl: spacing(2),
                  display: 'flex',
                  alignItems: 'center',
                })}
              >
                <Typography variant="body1">{data.description}</Typography>
              </Box>
              <Typography
                sx={({ spacing }) => ({
                  pt: spacing(2),
                  pl: spacing(2),
                  fontWeight: 600,
                })}
                variant="h6"
              >
                Dimensions
              </Typography>
              <Box
                sx={({ spacing }) => ({
                  pt: spacing(2),
                  pb: spacing(2),
                })}
              >
                <Grid container columns={4}>
                  {data.parameter.map(({ paramId, value }) => (
                    // <Grid key={paramId}>
                    <Box
                      sx={({ spacing }) => ({
                        pl: spacing(2),
                        pr: spacing(2),
                      })}
                    >
                      <Typography sx={{ color: theme.palette.grey[500] }}>
                        Dimension {paramId}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                    // </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider variant="middle" />

              <Box
                sx={({ spacing }) => ({
                  pl: spacing(2),
                  pt: spacing(2),
                  pb: spacing(2),
                })}
              >
                <Grid
                  container
                  sx={() => ({
                    direction: 'row',
                  })}
                >
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Negotiable?</Typography>
                    <Typography>{data.negotiable.toString()}</Typography>
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Unit Price?</Typography>
                    <Typography>{data.unitPrice.toString()}</Typography>
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Category?</Typography>
                    <Typography>{data.categoryId}</Typography>
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Posted On?</Typography>
                    <Typography>NIL</Typography>
                  </Box>

                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Posted By?</Typography>
                    <Typography>{data.owner.name}</Typography>
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Company?</Typography>
                    <Typography>{data.owner.company.name}</Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid
              item
              xs={4}
              sx={({ spacing }) => ({
                pt: spacing(2),
                pl: spacing(4),
              })}
            >
              <ChatNow data={data} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </main>
  );
};

export default DetailedListingPage;
