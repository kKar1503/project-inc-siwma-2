import Head from 'next/head';
import ProfileDetailCard, {
  ProfileDetailCardProps,
} from '@/components/marketplace/profile/ProfileDetailCard';
import ListingsTab from '@/components/marketplace/profilePage/ListingsTab';
import ReviewsTab from '@/components/marketplace/profilePage/ReviewsTab';
import TabPanel from '@/components/marketplace/profilePage/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import { useState, SyntheticEvent, useMemo, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import fetchCompany from '@/middlewares/fetchCompany';
import { useRouter } from 'next/router';
import { Listing, Review } from '@/utils/api/client/zod';
import fetchProfilesListings from '@/middlewares/fetchProfilesListings';
import fetchProfilesReview from '@/middlewares/fetchProfilesReview';
import { useResponsiveness } from '@inc/ui';
import fetchListingImages from '@/middlewares/fetchListingImages';

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

export type ProfilePageProps = {
  data: ProfileDetailCardProps;
  serverSideListings: Listing[];
  serverSideReviews: Review[];
};

const useGetUser = (userUuid: string) => {
  const { data } = useQuery('userdata', async () => fetchCompany(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const useGetListing = (userUuid: string, matching?: string, sortBy?: string, filter?: string) => {
  const { data } = useQuery(
    ['listingdata', userUuid, matching, sortBy, filter],
    async () => {
      if (matching || sortBy || filter) {
        return fetchProfilesListings(userUuid, matching, sortBy, filter);
      }
      return fetchProfilesListings(userUuid);
    },
    {
      // change the enabled to trigger on filter/sort
      enabled:
        userUuid !== undefined ||
        sortBy !== undefined ||
        matching !== undefined ||
        filter !== undefined,
    }
  );

  return data;
};

const useGetProfileListingImagesQuery = (listingID: string) => {
  const { data } = useQuery('listingImages', async () => fetchListingImages(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

// add one more parameter to fetchProfilesReview to include the filter
const useGetReview = (userUuid: string, sortBy?: string) => {
  const { data } = useQuery(
    ['reviewdata', userUuid, sortBy],
    async () => {
      if (sortBy) {
        return fetchProfilesReview(userUuid, sortBy);
      }
      return fetchProfilesReview(userUuid);
    },
    {
      enabled: userUuid !== undefined || sortBy !== undefined,
    }
  );

  return data;
};

const ProfilePage = ({ data, serverSideListings, serverSideReviews }: ProfilePageProps) => {
  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const id = useRouter().query.id as string;
  const userDetails = useGetUser(id);
  const profileListingImages = useGetProfileListingImagesQuery(id);
  // console.log(userDetails);

  const theme = useTheme();
  const { spacing } = theme;

  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(searchQuery);
  };

  // when filter/sorts are called use set states to set the new listings/reviews again
  const [listings, setListings] = useState(serverSideListings);
  const [reviews, setReviews] = useState(serverSideReviews);
  const [filterListings, setFilterListings] = useState('');
  const [sortByListings, setSortByListings] = useState('recent_newest');
  const [filterReviews, setFilterReviews] = useState('');
  const [sortByReviews, setSortByReviews] = useState('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const userListings = useGetListing(id, searchQuery, sortByListings, filterListings);
  const userReviews = useGetReview(id, sortByReviews);

  useEffect(() => {
    if (userListings) {
      setListings(userListings);
    }
  }, [userListings]);

  useEffect(() => {
    if (userReviews) {
      setReviews(userReviews.reviews);
    }
  }, [userReviews]);

  const handleFilterListings = (filter: string) => {
    setFilterListings(filter);
    // make endpoint call to carry out filter
  };

  const handleSortByListings = (filter: string) => {
    setSortByListings(filter);
  };

  const handleFilterReviews = (filter: string) => {
    setFilterReviews(filter);
    // make endpoint call to carry out filter
  };

  const handleSortByReviews = (filter: string) => {
    setSortByReviews(filter);
    // make endpoint call to carry out filter
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const spaceStyle = useMemo(() => {
    if (isSm) {
      return {
        py: spacing(3),
        px: '20px',
        height: '100%;',
        width: '100%',
      };
    }
    if (isMd) {
      return {
        py: spacing(3),
        px: '40px',
        height: '100%;',
        width: '100%',
      };
    }
    if (isLg) {
      return {
        py: spacing(3),
        px: '60px',
        height: '100%;',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      };
    }
    return {
      py: spacing(3),
      px: '20px',
      height: '100%;',
      width: '100%',
    };
  }, [isSm, isMd, isLg]);

  return (
    <>
      <Head>
        <title>{userDetails?.name}&lsquo;s Listings</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box sx={spaceStyle}>
          {userDetails && (
            <ProfileDetailCard data={userDetails} reviewData={userReviews} visibleEditButton/>
          )}
          <Box
            sx={{
              width: isLg ? '73%' : '100%',
              height: 'full',
              bgcolor: theme.palette.common.white,
              borderRadius: theme.shape,
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <StyledTab
                label="Listings"
                sx={{
                  // added in-line styling here because styled() doesn't want to work
                  border: 1,
                  borderColor: theme.palette.primary[400],
                  '&.Mui-selected': {
                    minHeight: 60,
                    color: theme.palette.common.white,
                    bgcolor: theme.palette.primary[400],
                    border: 1,
                    borderColor: theme.palette.primary[400],
                    borderRadius: theme.shape,
                  },
                }}
              />
              <StyledTab
                label="Reviews"
                sx={{
                  border: 1,
                  borderColor: theme.palette.primary[400],
                  '&.Mui-selected': {
                    minHeight: 60,
                    color: theme.palette.common.white,
                    bgcolor: theme.palette.primary[400],
                    border: 1,
                    borderColor: theme.palette.primary[400],
                    borderRadius: theme.shape,
                  },
                }}
              />
            </Tabs>
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
              <TabPanel value={value} index={0} dir={theme.direction} height="100vh">
                <ListingsTab
                  allListings={listings}
                  handleSearch={handleSearch}
                  filterListings={handleFilterListings}
                  sortByListings={handleSortByListings}
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction} height="100vh">
                <ReviewsTab
                  allReviews={reviews}
                  // rmb to add userDetails.rating and userDetails.reviews
                  userRating={userReviews?.avgRating}
                  totalReviews={userReviews?.count}
                  filterReviews={handleFilterReviews}
                  sortByReviews={handleSortByReviews}
                />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default ProfilePage;
