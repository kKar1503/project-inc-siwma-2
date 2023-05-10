import Head from 'next/head';
import ProfileDetailCard, {
  ProfileDetailCardProps,
} from '@/components/marketplace/profile/ProfileDetailCard';
import ListingsTab from '@/components/marketplace/profilePage/ListingsTab';
import ReviewsTab from '@/components/marketplace/profilePage/ReviewsTab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import { ReactNode, useState, SyntheticEvent } from 'react';
import { useTheme, styled } from '@mui/material/styles';

// eslint-disable-next-line no-unused-vars

// test data for profile component
const profileDetailData = [
  {
    username: 'diggers',
    name: 'John Tan',
    email: 'digs@gmail.com',
    company: 'Prof. Digging Ltd.',
    profilePic: 'J',
    mobileNumber: '2314 5324',
    telegramUsername: '@digpeople',
    bio: 'Introducing Professional Digging Limited, a leading mining company with a proven track record of excellence in the industry. With decades of experience in the mining business, we have established ourselves as a trusted and reliable provider of high-quality minerals and metals.',
    rating: 3.3,
    reviews: 336,
  },
  {
    username: 'rock_hound',
    name: 'Emily Stone',
    email: 'emily.stone@gmail.com',
    company: 'Stone Exploration Co.',
    profilePic: 'E',
    mobileNumber: '4590 2379',
    telegramUsername: '@stone_explorer',
    bio: 'At Stone Exploration Co., we specialize in the exploration and development of new mineral resources. Our team of experts uses cutting-edge technology to identify promising mineral deposits and assess their potential for commercial mining. We are dedicated to responsible mining practices that prioritize the safety of our workers and the protection of the environment.',
    rating: 4.6,
    reviews: 97,
  },
  {
    username: 'ore_king',
    name: 'David Hill',
    email: 'david.hill@orekingdom.com',
    company: 'Ore Kingdom Inc.',
    profilePic: 'D',
    mobileNumber: '9031 2150',
    telegramUsername: '@ore_kingdom',
    bio: 'Ore Kingdom Inc. is a leading provider of iron ore and other minerals to markets around the world. We have extensive experience in mining and processing high-quality ores and are committed to sustainable and responsible practices. Our team is dedicated to delivering the best possible products and services to our customers.',
    rating: 4.8,
    reviews: 215,
  },
  {
    username: 'gold_digger',
    name: 'Sarah Jones',
    email: 'sjones@golddigger.com',
    company: 'Gold Digger Mining Corp.',
    profilePic: 'S',
    mobileNumber: '5678 1234',
    telegramUsername: '@gold_digger',
    bio: 'Gold Digger Mining Corp. is a trusted provider of gold and other precious metals. Our team of experts has decades of experience in mining and processing high-quality ores, and we are committed to responsible practices that prioritize safety, sustainability, and environmental protection. We strive to exceed the expectations of our customers and provide them with the best possible products and services.',
    rating: 4.3,
    reviews: 184,
  },
  {
    username: 'mining_pro',
    name: 'Jackie Lee',
    email: 'jackie.lee@miningpro.com',
    company: 'Mining Pro Solutions',
    profilePic: 'J',
    mobileNumber: '7777 9999',
    telegramUsername: '@mining_pro',
    bio: 'Mining Pro Solutions provides cutting-edge solutions for the mining industry. Our team of experienced professionals specializes in the design, engineering, and implementation of advanced mining equipment and technologies that improve efficiency, safety, and productivity. We are committed to delivering the best possible solutions to our clients and helping them achieve their goals.',
    rating: 4.9,
    reviews: 102,
  },
  {
    username: 'ore_genius',
    name: 'Karen Chen',
    email: 'karen.chen@oregenius.com',
    company: 'Ore Genius Inc.',
    profilePic: 'K',
    mobileNumber: '1234 5678',
    telegramUsername: '@ore_genius',
    bio: 'Ore Genius Inc. is a cutting-edge provider of mineral exploration and analysis services. Our team of experts uses the latest technology to identify and assess mineral deposits, helping our clients make informed decisions about their mining operations. We are committed to delivering high-quality services that exceed our clients expectations and contribute to sustainable and responsible mining practices.',
    rating: 4.5,
    reviews: 76,
  },
];

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
  if (id > profileDetailData.length) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const data = profileDetailData[id - 1];

  return {
    props: {
      data,
    },
  };
};

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
  height: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, height, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3, height: { height }, overflowY: 'auto' }}>{children}</Box>
      )}
    </div>
  );
};

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

const ProfilePage = ({ data }: { data: ProfileDetailCardProps }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

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
          <ProfileDetailCard
            username={data.username}
            name={data.name}
            company={data.company}
            email={data.email}
            profilePic={data.profilePic}
            telegramUsername={data.telegramUsername}
            bio={data.bio}
            mobileNumber={data.mobileNumber}
            rating={data.rating}
            reviews={data.reviews}
          />
          <Box
            sx={{
              width: '73%',
              height: 'full',
              bgcolor: theme.palette.common.white,
              borderRadius: theme.shape,
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
              <TabPanel value={value} index={0} dir={theme.direction} height="90.5vh">
                <ListingsTab />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction} height="90.5vh">
                <ReviewsTab userRating={data.rating} totalReviews={data.reviews} />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default ProfilePage;
