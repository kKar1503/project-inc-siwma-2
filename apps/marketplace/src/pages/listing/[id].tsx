import Box from '@mui/material/Box';
import { useTheme, styled } from '@mui/material/styles';
import DetailedListingCarousel, {
  DetailedListingCarouselProps,
  Image,
} from '@/components/marketplace/carousel/DetailedListingCarousel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ChatNow from '@/components/marketplace/listing/ChatNow';
import SellBadge from '@/components/marketplace/listing/SellBadge';
import BuyBadge from '@/components/marketplace/listing/BuyBadge';
import fetchListing from '@/middlewares/fetchListing';
import { useQuery } from 'react-query';
import StarRating from '@/components/marketplace/profilePage/StarRatings';
import { Button } from '@mui/material';
import { useResponsiveness } from '@inc/ui';
import { CategoryResponseBody, ListingResponseBody } from '@/utils/api/client/zod';
import fetchListingImages from '@/middlewares/fetchListingImages';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import fetchCat from '@/middlewares/fetchCatNames';
import fetchUser from '@/middlewares/fetchUser';
import fetchReviews from '@/middlewares/fetchReviews';
import fetchParams from '@/middlewares/fetchParamNames';

// Test Data for listing details
// const detailedListingData = [
//   {
//     id: 1,
//     name: 'Item A',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed bibendum erat. Etiam malesuada, massa non blandit mattis, lacus mi dignissim nisl, non lacinia lectus sapien non mi. Vivamus nisi leo, auctor a urna vitae, aliquet consequat nisi. In quis dolor urna. Maecenas id mauris ultrices, bibendum neque lacinia, euismod felis. ',
//     price: 300,
//     unitPrice: false,
//     negotiable: true,
//     categoryId: '1',
//     type: 'SELL',
//     owner: {
//       id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
//       name: 'Elon Musk',
//       email: 'elon.musk@example.com',
//       company: {
//         id: '1',
//         name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
//         website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
//         bio: 'Owner bio',
//         image: '',
//         visible: true,
//       },
//       profilePic: null,
//       mobileNumber: '69694202',
//       contactMethod: 'email',
//       bio: null,
//     },
//     active: true,
//     parameter: [
//       {
//         paramId: '3',
//         value: 200,
//       },
//       {
//         paramId: '2',
//         value: 300,
//       },
//     ],
//     createdAt: '2023-05-15T18:03:01.036Z',
//   },

//   {
//     id: 2,
//     name: 'Item B',
//     description: 'Listing description',
//     price: 300,
//     unitPrice: false,
//     negotiable: true,
//     categoryId: '1',
//     type: 'SELL',
//     owner: {
//       id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
//       name: 'Elon Musk',
//       email: 'elon.musk@example.com',
//       company: {
//         id: '1',
//         name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
//         website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
//         bio: 'Owner bio',
//         image: '',
//         visible: true,
//       },
//       profilePic: null,
//       mobileNumber: '69694202',
//       contactMethod: 'email',
//       bio: null,
//     },
//     active: true,
//     parameter: [
//       {
//         paramId: '3',
//         value: 200,
//       },
//       {
//         paramId: '2',
//         value: 300,
//       },
//     ],
//     createdAt: '2023-05-15T18:03:01.036Z',
//   },

//   {
//     id: 3,
//     name: 'Item C',
//     description: 'Listing description',
//     price: 300,
//     unitPrice: false,
//     negotiable: true,
//     categoryId: '1',
//     type: 'SELL',
//     owner: {
//       id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
//       name: 'Elon Musk',
//       email: 'elon.musk@example.com',
//       company: {
//         id: '1',
//         name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
//         website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
//         bio: 'Owner bio',
//         image: '',
//         visible: true,
//       },
//       profilePic: null,
//       mobileNumber: '69694202',
//       contactMethod: 'email',
//       bio: null,
//     },
//     active: true,
//     parameter: [
//       {
//         paramId: '3',
//         value: 200,
//       },
//       {
//         paramId: '2',
//         value: 300,
//       },
//     ],
//     createdAt: '2023-05-15T18:03:01.036Z',
//   },

//   {
//     id: 4,
//     name: 'Item D',
//     description: 'Listing description',
//     price: 300,
//     unitPrice: false,
//     negotiable: true,
//     categoryId: '1',
//     type: 'SELL',
//     owner: {
//       id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
//       name: 'Elon Musk',
//       email: 'elon.musk@example.com',
//       company: {
//         id: '1',
//         name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
//         website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
//         bio: 'Owner bio',
//         image: '',
//         visible: true,
//       },
//       profilePic: null,
//       mobileNumber: '69694202',
//       contactMethod: 'email',
//       bio: null,
//     },
//     active: true,
//     parameter: [
//       {
//         paramId: '3',
//         value: 200,
//       },
//       {
//         paramId: '2',
//         value: 300,
//       },
//     ],
//     createdAt: '2023-05-15T18:03:01.036Z',
//   },
// ];

// test data for carousel component
// const carouselData: DetailedListingCarouselProps = [
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
// const categoryData = [
//   {
//     id: '1',
//     name: 'Cat 1',
//     description: 'Description2',
//     image: '5b41acd4-4c77-4f32-ab78-2192b451b1f8',
//     crossSectionImage: '57b6ddfe-6f21-463f-ba0c-16f6b88c3162',
//     active: true,
//     parameters: [
//       {
//         parameterId: '1',
//         required: true,
//       },
//       {
//         parameterId: '2',
//         required: true,
//       },
//       {
//         parameterId: '3',
//         required: false,
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Cat 2',
//     description: 'Description2',
//     image: '5b41acd4-4c77-4f32-ab78-2192b451b1f8',
//     crossSectionImage: '57b6ddfe-6f21-463f-ba0c-16f6b88c3162',
//     active: true,
//     parameters: [
//       {
//         parameterId: '1',
//         required: true,
//       },
//       {
//         parameterId: '2',
//         required: true,
//       },
//       {
//         parameterId: '3',
//         required: false,
//       },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Cat 3',
//     description: 'Description2',
//     image: '5b41acd4-4c77-4f32-ab78-2192b451b1f8',
//     crossSectionImage: '57b6ddfe-6f21-463f-ba0c-16f6b88c3162',
//     active: true,
//     parameters: [
//       {
//         parameterId: '1',
//         required: true,
//       },
//       {
//         parameterId: '2',
//         required: true,
//       },
//       {
//         parameterId: '3',
//         required: false,
//       },
//     ],
//   },
// ];

// const listingReviewsData = [
//   {
//     id: '1',
//     review: 'sample review',
//     rating: 5,
//     userId: '1',
//     listingId: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//   },
//   {
//     id: '2',
//     review: 'sample review',
//     rating: 5,
//     userId: '2',
//     listingId: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//   },
//   {
//     id: '3',
//     review: 'sample review',
//     rating: 5,
//     userId: '3',
//     listingId: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//   },
//   {
//     id: '4',
//     review: 'sample review',
//     rating: 5,
//     userId: '4',
//     listingId: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//   },
//   {
//     id: '5',
//     review: 'sample review',
//     rating: 5,
//     userId: '5',
//     listingId: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//   },
// ];

// const userData = [
//   {
//     id: '1',
//     name: 'John Doe',
//     email: 'johndoe@gmail.com',
//     company: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//     enabled: true,
//     profilePic: '',
//     comments: 'hello',
//     mobileNumber: '91234567',
//     contactMethod: 'telegram',
//     bio: 'Hello, I am John Doe!',
//   },
//   {
//     id: '2',
//     name: 'Dohn Joe',
//     email: 'johndoe@gmail.com',
//     company: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//     enabled: true,
//     profilePic: '',
//     comments: 'hello',
//     mobileNumber: '91234567',
//     contactMethod: 'telegram',
//     bio: 'Hello, I am John Doe!',
//   },
//   {
//     id: '3',
//     name: 'potato',
//     email: 'johndoe@gmail.com',
//     company: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//     enabled: true,
//     profilePic: '',
//     comments: 'hello',
//     mobileNumber: '91234567',
//     contactMethod: 'telegram',
//     bio: 'Hello, I am John Doe!',
//   },
//   {
//     id: '4',
//     name: 'tomato',
//     email: 'johndoe@gmail.com',
//     company: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//     enabled: true,
//     profilePic: '',
//     comments: 'hello',
//     mobileNumber: '91234567',
//     contactMethod: 'telegram',
//     bio: 'Hello, I am John Doe!',
//   },
//   {
//     id: '5',
//     name: 'toe taker',
//     email: 'johndoe@gmail.com',
//     company: '1',
//     createdAt: '2022-08-17T00:29:56.437Z',
//     enabled: true,
//     profilePic: '',
//     comments: 'hello',
//     mobileNumber: '91234567',
//     contactMethod: 'telegram',
//     bio: 'Hello, I am John Doe!',
//   },
// ];

// export interface catDataType {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   crossSectionImage: string;
//   active: boolean;
//   parameters: [
//     {
//       parameterId: string;
//       required: boolean;
//     },
//     {
//       parameterId: string;
//       required: boolean;
//     },
//     {
//       parameterId: string;
//       required: boolean;
//     }
//   ];
// }

// export interface listingDataType {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   unitPrice: boolean;
//   negotiable: boolean;
//   categoryId: string;
//   type: string;
//   owner: {
//     id: string;
//     name: string;
//     email: string;
//     company: {
//       id: string;
//       name: string;
//       website: string;
//       bio: string;
//       image: '';
//       visible: boolean;
//     };
//     profilePic: null;
//     mobileNumber: string;
//     contactMethod: string;
//     bio: null;
//   };
//   active: boolean;
//   parameter: [
//     {
//       paramId: string;
//       value: number;
//     },
//     {
//       paramId: string;
//       value: number;
//     }
//   ];
//   createdAt: string;
// }

export interface reviewsDataType {
  id: string;
  review: string;
  rating: number;
  userId: string;
  listingId: string;
  createdAt: string;
}

export type catDataType = {
  data: CategoryResponseBody[];
};

export type listingDataType = {
  data: ListingResponseBody[];
};

// const useDetailedListingQuery = (
//   listingId: string,
//   setListingData: Dispatch<SetStateAction<listingDataType>>
// ) => {
//   // fetchListing(listingId);
//   const { data } = useQuery(
//     'detailedListing',
//     async() => {
//       const response = await axios.get(
//         `v1/listing/${listingId}`
//       );

//       const parsedDetailedListing = listings.getById.parse(response.data.data)

//       setListingData({ data: parsedDetailedListing });
//       return parsedDetailedListing;
//     },
//     {
//       enabled: listingId !== undefined,
//     }
//   )
//   console.log(data)
// }

// export const getServerSideProps = async ({
//   query,
// }: GetServerSidePropsContext<{ id?: string | string[] }>) => {
//   // api call to get user details go here
//   // if user does not exist, return error code and redirect to wherever appropriate

//   const id = Array.isArray(query.id) ? query.id[0] : query.id;
//   const intCheck = !id || !Number.isInteger(parseFloat(id));

//   if (intCheck) {
//     // Redirect to the index page
//     return {
//       redirect: {
//         destination: '/',
//       },
//     };
//   }

//   const numericId = parseInt(id, 10);

//   const data = profileDetailData[numericId - 1];
//   const serverSideListings = marketplaceListingsData;
//   const serverSideReviews = reviewsTestData;

//   return {
//     props: {
//       data,
//       serverSideListings,
//       serverSideReviews,
//     },
//   };
// };

const useGetListingQuery = (listingID: string) => {
  const { data } = useQuery('listing', async () => fetchListing(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery('user', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const useGetCategoryNameQuery = (catID: string) => {
  const { data } = useQuery('catName', async () => fetchCat(catID));
  return data;
};

const useGetReviewsQuery = (listingID: string) => {
  const { data } = useQuery('reviews', async () => fetchReviews(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

const useGetListingImagesQuery = (listingID: string) => {
  const { data } = useQuery('listingImage', async () => fetchListingImages(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

const useGetParamQuery = () => {
  const { data } = useQuery('params', async () => fetchParams());
  return data;
};

// export const getServerSideProps = async ({ query }: { query: any }) => {
//   // api call to get listing details go here

//   const { id } = query;
//   if (!Number.isInteger(parseFloat(id))) {
//     // Redirect to the index page
//     return {
//       redirect: {
//         destination: '/',
//       },
//     };
//   }

//   // just for testing purposes
//   if (id > detailedListingData.length) {
//     return {
//       redirect: {
//         destination: '/',
//       },
//     };
//   }

//   const data = detailedListingData[id - 1];
//   const serverSideListingCarousel = carouselData;

//   return {
//     props: {
//       data,
//       serverSideListingCarousel,
//       listingReviewsData,
//       categoryData,
//     },
//   };
// };

export type DetailedListingPageProps = {
  data: listingDataType;
  serverSideCat: catDataType;
  serverSideReviews: reviewsDataType;
  serverSideListingCarousel: DetailedListingCarouselProps;
};

// const DetailedListingPage = ({
//   data,
//   serverSideListingCarousel,
//   serverSideCat,
//   serverSideReviews,
// }: DetailedListingPageProps) => {
const DetailedListingPage = () => {
  //   const [listingData, setListingData] = useState<listingDataType>({ data: [] });

  // useDetailedListingQuery(setListingData);

  const theme = useTheme();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  // const [listings, setListings] = useState(data);
  // const [reviews, setReviews] = useState(serverSideReviews);
  // const [cat, setCat] = useState(serverSideCat);
  const { spacing, shape, shadows, palette, typography } = useTheme();

  const listings = useGetListingQuery('2');
  const reviews = useGetReviewsQuery('2');
  const catID = listings?.categoryId as string
  const cat = useGetCategoryNameQuery('8');
  // const user = useGetUserQuery(uuid)
  
  const param = useGetParamQuery();
  // const listingImg = useGetListingImagesQuery('3');

  listings?.parameters?.sort((a, b) => {
    if (a.paramId < b.paramId) {
      return -1;
    }
    if (a.paramId > b.paramId) {
      return 1;
    }
    return 0;
  });

  // converts to UI design if screen goes to mobile
  const listingStyles = useMemo(() => {
    if (isSm) {
      return {
        pagePadding: {
          mx: spacing(0),
          mt: spacing(0),
        },
      };
    }
    if (isMd) {
      return {
        pagePadding: {
          mx: spacing(5),
          mt: spacing(3),
        },
      };
    }
    if (isLg) {
      return {
        pagePadding: {
          mx: spacing(5),
          mt: spacing(3),
        },
      };
    }
    return {
      pagePadding: {
        mx: spacing(5),
        mt: spacing(3),
      },
    };
  }, [isSm, isMd, isLg]);

  const parseISOstring = (s: string) => {
    const b = s.split(/\D+/);
    const newDate = `${b[2]} ${b[1]} ${b[0]}`;
    return newDate;
  };

  return (
    <main>
      <Box
        sx={({ spacing }) => ({
          pt: spacing(4),
          height: '100%',
          width: '100%',
          bgcolor: theme.palette.common.white,
        })}
      >
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
            <Grid item xs={8} sx={({ spacing }) => ({ pl: spacing(5) })}>
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
                      {listings?.type === 'BUY' && <BuyBadge />}
                      {listings?.type === 'SELL' && <SellBadge />}
                    </Box>
                    <Typography
                      sx={({ spacing }) => ({
                        fontWeight: 600,
                        pl: spacing(2),
                      })}
                      variant="h6"
                    >
                      {listings?.name}
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
                    S${listings?.price}
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
                <Typography variant="body1">{listings?.description}</Typography>
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
                  {listings?.parameters?.map(({ paramId, value }) => (
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
                  sx={{
                    direction: 'row',
                  }}
                >
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Negotiable</Typography>
                    <Typography>{listings?.negotiable ? 'Yes' : 'No'}</Typography>
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Unit Price</Typography>
                    <Typography>{listings?.unitPrice ? 'Yes' : 'No'}</Typography>
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Category</Typography>
                    {/* <Typography>{cat?.((x) => x.id === listings?.categoryId)?.name}</Typography> */}
                    <Typography>{cat?.name}</Typography>
                    {/* <Typography>{listings?.categoryId}</Typography> */}
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Posted On</Typography>
                    {/* <Typography>{parseISOstring(listings?.createdAt)}</Typography> */}
                  </Box>

                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Posted By</Typography>
                    <Typography>{listings?.owner.name}</Typography>
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Company</Typography>
                    <Typography>{listings?.owner.company.name}</Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid
              item
              xs={4}
              sx={({ spacing }) => ({
                pt: spacing(2),
                pl: spacing(5),
              })}
            >
              {/* <ChatNow data={data} /> */}
            </Grid>

            <Box
              sx={({ spacing }) => ({
                pt: spacing(3),
                pb: spacing(4),
                ml: spacing(5),
                width: '100%',
              })}
            >
              <Grid container>
                <Grid item xs={4}>
                  <Typography sx={{ fontWeight: 600 }} variant="h5">
                    Reviews
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    sx={({ palette }) => ({ width: 250, backgroundColor: palette.primary.main })}
                  >
                    ADD A REVIEW
                  </Button>
                </Grid>
              </Grid>

              {reviews?.map(({ id, review, rating }) => (
                <Box sx={({ spacing }) => ({ width: 300, pt: spacing(3) })}>
                  <Grid container>
                    <Grid item xs={6}>
                      {/* <Typography
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        {userData.find((x) => x.id === id)?.name}
                      </Typography> */}
                      {review}
                    </Grid>
                    <Grid item xs={6}>
                      <StarRating rating={rating} />
                    </Grid>
                  </Grid>
                  <Divider
                    sx={({ spacing }) => ({ pt: spacing(2), width: 'full' })}
                    variant="fullWidth"
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Box>
      </Box>
    </main>
  );
};

export default DetailedListingPage;
