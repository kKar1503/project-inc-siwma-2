import Head from 'next/head';
import ProfileDetailCard, {
  ProfileDetailCardProps,
} from '@/components/marketplace/profile/ProfileDetailCard';
// import { ReviewProps } from '@/components/marketplace/profilePage/ReviewMessage';
import ListingsTab from '@/components/marketplace/profilePage/ListingsTab';
import ReviewsTab from '@/components/marketplace/profilePage/ReviewsTab';
import TabPanel from '@/components/marketplace/profilePage/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import { useState, SyntheticEvent, useMemo } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import apiClient from '@/utils/api/client/apiClient';
import { useQuery } from 'react-query';
// import fetchUser from '@/middlewares/fetchUser';
import users from '@/utils/api/client/zod/users';
import { useRouter } from 'next/router';
import { Listing, Review } from '@/utils/api/client/zod';
import fetchListing from '@/middlewares/fetchListing';
import fetchReview from '@/middlewares/fetchReview';
import { useResponsiveness } from '@inc/ui';

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

// user profile page
const fetchUser = async (uuid: string) => {
  if (uuid) {
    const response = await apiClient.get(`/v1/users/${uuid}`);
    // parse data through zod to ensure data is correct
    const parsedUser = users.getById.parse(response.data.data[0]);
    return parsedUser;
  }

  return null;
};

const useGetUser = (userUuid: string) => {
  const { data } = useQuery('userdata', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });
  // console.log(data);
  return data;
};

const useGetListing = (userUuid: string) => {
  const { data } = useQuery('listingdata', async () => fetchListing(userUuid), {
    enabled: userUuid !== undefined,
  });
  // console.log(data);
  return data;
};

const useGetReview = (userUuid: string) => {
  const { data } = useQuery('reviewdata', async () => fetchReview(userUuid), {
    enabled: userUuid !== undefined,
  });
  // console.log(data);
  return data;
};

const ProfilePage = ({ data, serverSideListings, serverSideReviews }: ProfilePageProps) => {
  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const id = useRouter().query.id as string;
  const userDetails = useGetUser(id);
  const userListings = useGetListing(id);
  const userReviews = useGetReview(id);
  // console.log(userDetails);
  console.log(userListings);

  const theme = useTheme();
  const { spacing } = theme;

  const [value, setValue] = useState(0);
  // when filter/sorts are called use set states to set the new listings/reviews again
  const [reviews, setReviews] = useState(serverSideReviews);
  const [filterListings, setFilterListings] = useState('');
  const [sortByListings, setSortByListings] = useState('');
  const [filterReviews, setFilterReviews] = useState('');
  const [sortByReviews, setSortByReviews] = useState('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const handleFilterListings = (filter: string) => {
    setFilterListings(filter);
    fetchUser(loggedUserUuid);
    // make endpoint call to carry out filter
  };

  const handleSortByListings = (filter: string) => {
    setSortByListings(filter);
    fetchUser(loggedUserUuid);
    // make endpoint call to carry out filter
  };

  const handleFilterReviews = (filter: string) => {
    setFilterReviews(filter);
    fetchUser(loggedUserUuid);
    // make endpoint call to carry out filter
  };

  const handleSortByReviews = (filter: string) => {
    setSortByReviews(filter);
    fetchUser(loggedUserUuid);
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
          <ProfileDetailCard data={userDetails} />
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
                  // allListings={listings}
                  allListings={userListings}
                  filterListings={handleFilterListings}
                  sortByListings={handleSortByListings}
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction} height="100vh">
                <ReviewsTab
                  allReviews={reviews}
                  // rmb to add userDetails.rating and userDetails.reviews
                  userRating={2}
                  totalReviews={200}
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
