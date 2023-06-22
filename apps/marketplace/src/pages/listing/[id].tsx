import Box from '@mui/material/Box';
import { useTheme, styled } from '@mui/material/styles';
import DetailedListingCarousel from '@/components/marketplace/carousel/DetailedListingCarousel';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import SellBadge from '@/components/marketplace/listing/SellBadge';
import BuyBadge from '@/components/marketplace/listing/BuyBadge';
import fetchListing from '@/middlewares/fetchListing';
import { useMutation, useQuery } from 'react-query';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import {
  StarsRating,
  useResponsiveness,
  AddCommentModal,
} from '@inc/ui';
import fetchListingImages from '@/middlewares/fetchListingImages';
import React, { useMemo, useState, useEffect } from 'react';
import fetchCategories from '@/middlewares/fetchCategories';
import fetchUsers from '@/middlewares/fetchUsers';
import fetchReviews from '@/middlewares/fetchReviews';
import fetchParams from '@/middlewares/fetchParamNames';
import fetchUser from '@/middlewares/fetchUser';
import bookmarkListing from '@/middlewares/bookmarks/bookmarkListing';
import { DateTime } from 'luxon';
import ListingImgsPlaceholder from '@/components/marketplace/carousel/ListingImgsPlaceholder';
import fetchChatList from '@/middlewares/fetchChatList';
import { useSession } from 'next-auth/react';
import createRoom from '@/middlewares/createChat';
import { useRouter } from 'next/router';
import postReview from '@/middlewares/postReview';

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

const useGetListingQuery = (listingID: string) => {
  const { data } = useQuery('listing', async () => fetchListing(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

const useGetReviewsQuery = (listingID: string) => {
  const { data } = useQuery('reviews', async () => fetchReviews(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

const useGetUserQuery = () => {
  const { data } = useQuery('users', async () => fetchUsers());
  return data;
};

const useGetCurrentUserQuery = (loggedInUser: string) => {
  const { data } = useQuery('user', async () => fetchUser(loggedInUser), {
    enabled: loggedInUser !== undefined,
  });

  return data;
};

const useGetCategoryNameQuery = () => {
  const { data } = useQuery('cat', async () => fetchCategories());
  return data;
};

const useGetListingImagesQuery = (listingID: string) => {
  const { data } = useQuery('listingImages', async () => fetchListingImages(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

const useGetParamQuery = () => {
  const { data } = useQuery('params', async () => fetchParams());
  return data;
};

const useChatListQuery = (userUuid: string) => {
  const { data } = useQuery('chatList', async () => fetchChatList(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const useCreateChatQuery = (sellerId: string, buyerId: string, listingId: string) => {
  const { data } = useQuery('createChat', async () => createRoom(sellerId, buyerId, listingId));
  return data;
};

interface addNewReview {
  userUuid: string;
  review: string;
  rating: number;
}

const usePostReviewQuery = () =>
  useMutation((addReview: addNewReview) =>
    postReview(addReview.review, addReview.rating as number)
  );

//   const usePostReviewQuery = (userUuid: string) =>
//   useMutation({mutationFn: (addReview: addNewReview) => {
//       postReview(userUuid, addReview.review, addReview.rating)
//   }
// });

const useBookmarkListingQuery = (listingId: string, bookmarkedListings: string[] | undefined) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const handleBookmarkListing = async () => {
    await bookmarkListing(listingId);
    setIsBookmarked((prevState) => !prevState);
  };

  useEffect(() => {
    if (bookmarkedListings) {
      const bookmarked = bookmarkedListings.includes(listingId);
      setIsBookmarked(bookmarked);
    }
  }, [bookmarkedListings, listingId]);

  return {
    isBookmarked,
    handleBookmarkListing,
  };
};

const DetailedListingPage = () => {
  const theme = useTheme();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing } = useTheme();

  const router = useRouter();
  const listingId = router.query.id as string;
  const listings = useGetListingQuery(listingId);
  const reviews = useGetReviewsQuery(listingId);
  const listingImgs = useGetListingImagesQuery(listingId);
  const cats = useGetCategoryNameQuery();
  const user = useGetUserQuery();
  const currentUser = useSession();
  const param = useGetParamQuery();
  const loggedUserUuid = currentUser.data?.user.id as string;
  const loggedInUser = useGetCurrentUserQuery(loggedUserUuid);
  const bookmarkedListings = loggedInUser?.bookmarks?.listings;

  const chatRooms = useChatListQuery(loggedUserUuid);
  const buyerId = loggedUserUuid as unknown as string
  const sellerId = listings?.owner.id as string
  const newRoom = useCreateChatQuery(sellerId, buyerId, listingId);

  const postReview = usePostReviewQuery();
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const [inputText, setInputText] = useState<string>('');
  const [openComment, setOpenComment] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [isOpen, setIsOpen] = useState(false);

  // const createReview = (val: boolean) => {
  //   setRightButtonState(val)
  //   if (rightButtonState === true) { return postReview }
  //   return null
  // };

  useEffect(() => {
    if (rightButtonState === true) {
      const review = {
        userUuid: loggedUserUuid,
        review: inputText,
        rating: rating as number
      }
      postReview.mutate(review)
    }
  }, [rightButtonState, loggedUserUuid, inputText, rating ]);

  const { isBookmarked, handleBookmarkListing } = useBookmarkListingQuery(
    listingId,
    bookmarkedListings
  );

  const datetime = useMemo(
    () =>
      DateTime.fromISO(listings?.createdAt as unknown as string).toRelative({ locale: 'en-SG' }),
    [listings?.createdAt]
  );

  // check if room exists btwn buyer and seller
  const checkChatRoom = () => {
    if (chatRooms) {
      for (let i = 0; i < chatRooms.length; i++) {
        if (
          chatRooms[i].buyer.id !== loggedUserUuid &&
          chatRooms[i].seller?.id !== loggedUserUuid &&
          chatRooms[i].buyer.id !== listings?.owner.id &&
          chatRooms[i].seller?.id !== listings?.owner.id
        ) {
          return newRoom;
        }
      }
    }
    return null;
  };

  listings?.parameters?.sort((a, b) => {
    if (a?.paramId && b?.paramId) {
      if (a.paramId < b.paramId) {
        return -1;
      }
      if (a.paramId > b.paramId) {
        return 1;
      }
    }
    return 0;
  });

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
        <Container maxWidth="lg">
          {/* {listingImgs?.length ? (
            <DetailedListingCarousel data={listingImgs} />
          ) : (
            <ListingImgsPlaceholder />
          )} */}
          <DetailedListingCarousel data={carouselData} />
          <Grid container columns={12} sx={{ direction: 'row' }}>
            <Grid item xs={12} md={8} pt={2}>
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
                      pb: spacing(2),
                      pl: spacing(2),
                    })}
                  >
                    <Grid item>
                      <Box>
                        {listings?.type === 'BUY' && <BuyBadge />}
                        {listings?.type === 'SELL' && <SellBadge />}
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography
                        sx={({ spacing }) => ({
                          fontWeight: 600,
                          pl: spacing(2),
                        })}
                        variant={isSm || isMd ? 'h6' : 'h5'}
                      >
                        {listings?.name}
                      </Typography>
                    </Grid>
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
                <Grid item xs={2}>
                  <Grid container sx={{ direction: 'row' }}>
                    <Grid item md={2} />
                    {listings?.owner.id === loggedUserUuid && <Grid item xs={2} />}

                    <Grid item md={4}>
                      <IconButton
                        aria-label="share"
                        sx={({ spacing, palette }) => ({
                          p: spacing(0),
                          color: palette.common.black,
                        })}
                      >
                        <IosShareIcon fontSize={isSm ? 'medium' : 'large'} />
                      </IconButton>
                    </Grid>
                    {listings?.owner.id !== loggedUserUuid && (
                      <Grid item xs={4}>
                        <IconButton
                          aria-label="bookmark"
                          onClick={handleBookmarkListing}
                          sx={({ spacing, palette }) => ({
                            p: spacing(0),
                            color: palette.common.black,
                          })}
                        >
                          {isBookmarked ? (
                            <BookmarkIcon
                              fontSize={isSm ? 'medium' : 'large'}
                              sx={({ palette }) => ({
                                color: palette.warning[100],
                              })}
                            />
                          ) : (
                            <BookmarkBorderIcon fontSize={isSm ? 'medium' : 'large'} />
                          )}
                        </IconButton>
                      </Grid>
                    )}
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
                    <Typography>
                      {cats?.find((x) => x.id === listings?.categoryId)?.name}
                    </Typography>
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

            {!isSm && (
              <Grid item md={4} pt={2}>
                {/* Chat Now Component */}
                <Card
                  sx={({ palette }) => ({
                    border: palette.grey[300],
                    backgroundColor: palette.grey[100],
                  })}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 1,
                        paddingBottom: 2,
                      }}
                    >
                      <Avatar
                        sx={({ spacing }) => ({
                          mb: spacing(2),
                          height: { sx: 21, md: 35, lg: 42 },
                          width: { sx: 21, md: 35, lg: 42 },
                        })}
                      >
                        {listings?.owner.profilePic}
                      </Avatar>
                      <Box sx={{ pb: { md: 1, lg: 2 }, marginLeft: 2 }}>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={({ palette }) => ({
                            color: palette.common.black,
                            fontSize: { sx: 8, md: 12, lg: 16 },
                          })}
                        >
                          {listings?.owner.company.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Link href="/chat">
                        <Button
                          variant="contained"
                          sx={({ palette }) => ({
                            backgroundColor: palette.primary.main,
                            width: isMd ? 240 : 340,
                          })}
                          onClick={checkChatRoom}
                        >
                          Chat Now
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <Grid
                container
                columns={12}
                sx={({ spacing }) => ({
                  directon: 'row',
                  pt: spacing(2),
                  pb: spacing(2),
                  pl: spacing(2),
                })}
              >
                <Grid item xs={8} md={9}>
                  <Typography sx={{ fontWeight: 600 }} variant="h5">
                    Reviews
                  </Typography>
                </Grid>
                <Grid item xs={4} md={2.75}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={({ palette }) => ({ backgroundColor: palette.primary.main })}
                    onClick={() => setOpenComment(true)}
                  >
                    ADD A REVIEW
                  </Button>
                  <AddCommentModal
                    open={openComment}
                    setOpen={setOpenComment}
                    buttonColor="#0288D1"
                    // image api not up, so img not displayed
                    userImage={loggedInUser?.profilePic as string}
                    userName={loggedInUser?.name as string}
                    inputText={inputText}
                    setInputText={setInputText}
                    rating={rating}
                    setRating={setRating}
                    leftButtonText="cancel"
                    rightButtonText="Publish"
                    leftButtonState={leftButtonState}
                    rightButtonState={rightButtonState}
                    setLeftButtonState={setLeftButtonState}
                    setRightButtonState={setRightButtonState}
                  />
                </Grid>
                <Grid item xs={6} md={0.25} />
                {reviews?.length ? (
                  reviews?.map((individualReview) => (
                    <Box sx={({ spacing }) => ({ width: '100%', pt: spacing(3) })}>
                      <Grid container>
                        <Grid item xs={2} md={1}>
                          <Avatar>
                            {user?.find((x) => x.id === individualReview?.userId)?.profilePic}
                          </Avatar>
                        </Grid>
                        <Grid item xs={9} md={8}>
                          <Typography
                            sx={{
                              fontWeight: 500,
                            }}
                          >
                            {user?.find((x) => x.id === individualReview?.userId)?.name}
                          </Typography>
                          {individualReview?.review}
                        </Grid>
                        <Grid item xs={0} md={3}>
                          <StarsRating rating={individualReview?.rating} />
                        </Grid>
                      </Grid>
                      <Divider
                        sx={({ spacing }) => ({ pt: spacing(2), width: 'full' })}
                        variant="fullWidth"
                      />
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={({ spacing }) => ({
                      pt: spacing(3),
                      height: { sm: '17vh', md: '14vh', lg: '12vh' },
                      alignContent: 'center',
                    })}
                  >
                    <Typography sx={{ fontWeight: 500 }}>
                      No Reviews available for this listing
                    </Typography>
                  </Box>
                )}
              </Grid>

              {isSm && (
                <Box sx={({ spacing }) => ({ pb: spacing(2) })}>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    onClick={checkChatRoom}
                    fullWidth
                  >
                    CHAT NOW
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
};

export default DetailedListingPage;
