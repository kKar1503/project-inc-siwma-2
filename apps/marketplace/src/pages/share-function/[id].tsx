import Head from 'next/head';
import ProfileDetailCard from '@/components/marketplace/profile/ProfileDetailCard';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import fetchCompany from '@/middlewares/fetchCompany';
import { useRouter } from 'next/router';
import ListingCard from '@/components/ListingCard';
import { useSession } from 'next-auth/react';

const useGetUser = (userUuid: string) => {
  const { data } = useQuery('userData', async () => fetchCompany(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const ShareFunctionPage = () => {
  const router = useRouter();
  const loggedUserUuid = useSession().data?.user.id as string;
  const userDetails = useGetUser(loggedUserUuid);
  if (userDetails) {
    console.log(userDetails);
  }
  return (
    <>
      <Head>
        <title>Share Function</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box sx={{ display: 'flex' }}>
          {userDetails && <ProfileDetailCard data={userDetails} visibleEditButton />}
          <ListingCard />
        </Box>
      </main>
    </>
  );
};

export default ShareFunctionPage;
