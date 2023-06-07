import Box from '@mui/material/Box';
import { useTheme, styled } from '@mui/material/styles';
import DetailedListingCarousel, {
  DetailedListingCarouselProps,
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
import fetchListingImages from '@/middlewares/fetchListingImages';
import React, { useMemo, useState } from 'react';
import fetchCat from '@/middlewares/fetchCatNames';
import fetchUsers from '@/middlewares/fetchUser';
import fetchReviews from '@/middlewares/fetchReviews';
import fetchParams from '@/middlewares/fetchParamNames';
import { DateTime } from 'luxon';
import { User } from '@/utils/api/client/zod/users';

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

// const listingData = [
//   {
//     id: '1',
//     name: 'Aluminium I-Beams',
//     description: 'Listing description',
//     price: 300,
//     unitPrice: false,
//     negotiable: true,
//     categoryId: '1',
//     type: 'SELL',
//     multiple: true,
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
//     open: true,
//     rating: 4.5,
//     reviewCount: 12,
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

const useGetListingQuery = (listingID: string) => {
  const { data } = useQuery('listing', async () => fetchListing(listingID), {
    enabled: listingID !== undefined,
  });
  console.log(data)
  return data;
};

const useGetReviewsQuery = (listingID: string) => {
  const { data } = useQuery('reviews', async () => fetchReviews(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

const useGetUserQuery = () => {
  const { data } = useQuery('user', async () => fetchUsers());
  return data;
};

const useGetCategoryNameQuery = (catID: number) => {
  const { data } = useQuery('cat', async () => fetchCat(catID));
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

const DetailedListingPage = () => {
  const theme = useTheme();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing } = useTheme();

  const listings = useGetListingQuery('3');
  const reviews = useGetReviewsQuery('3');
  const catID = listings?.categoryId as unknown as number;
  const cats = useGetCategoryNameQuery(catID);
  const user = useGetUserQuery();
  const param = useGetParamQuery();
  // const listingImg = useGetListingImagesQuery('3');

  const datetime = useMemo(
    () =>
      DateTime.fromISO(listings?.createdAt as unknown as string).toRelative({ locale: 'en-SG' }),
    [listings?.createdAt]
  );

  listings?.parameters?.sort((a, b) => {
    if (a.paramId < b.paramId) {
      return -1;
    }
    if (a.paramId > b.paramId) {
      return 1;
    }
    return 0;
  });

  // const userIds = reviews?.map((review) => review.userId);

  // const usersPromise = userIds?.map(async (userId) => {
  //   const user = await fetchUser(userId);
  //   return user;
  // });

  // const [users, setUsers] = useState([])


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
        {/* <DetailedListingCarousel data={carouselData} /> */}
        <Box
          sx={{
            width: '70%',
            height: 'full',
            mr: 'auto',
            ml: 'auto',
          }}
        >
          <Grid container columns={12} sx={({ spacing }) => ({ direction: 'row', pl: spacing(4) })}>
            <Grid item xs={9} sx={({ spacing }) => ({ pl: spacing(5) })}>
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
                  {listings?.parameters?.map((parameter) => (
                    <Grid key={parameter?.paramId}>
                    <Box
                      sx={({ spacing }) => ({
                        pl: spacing(2),
                        pr: spacing(2),
                      })}
                    >
                      <Typography sx={{ color: theme.palette.grey[500] }}>
                        {param?.find((x) => x.id === parameter?.paramId)?.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        {parameter?.value}
                      </Typography>
                    </Box>
                    </Grid>
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
                    <Typography>{cats?.name}</Typography>
                    {/* <Typography>{listings?.categoryId}</Typography> */}
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pr: spacing(2),
                    })}
                  >
                    <Typography sx={{ color: theme.palette.grey[500] }}>Posted On</Typography>
                    <Typography>{datetime}</Typography>
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
              xs={3}
              sx={({ spacing }) => ({
                pt: spacing(2),
                pl: spacing(5),
              })}
            >
              {/* <ChatNow data={listingData} /> */}
            </Grid>

            <Box
              sx={({ spacing }) => ({
                pt: spacing(3),
                pb: spacing(4),
                pl: '6%',
                width: '70%',
              })}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: 600 }} variant="h5">
                    Reviews
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    sx={({ palette }) => ({ width: 250, backgroundColor: palette.primary.main })}
                  >
                    ADD A REVIEW
                  </Button>
                </Grid>
              </Grid>

              {reviews?.map((individualReview) => (
                <Box sx={({ spacing }) => ({ width: 300, pt: spacing(3) })}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        {user?.find((x) => x.id === individualReview?.userId)?.name}
                      </Typography>
                      {individualReview?.review}
                    </Grid>
                    <Grid item xs={6}>
                      <StarRating rating={individualReview?.rating} />
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
