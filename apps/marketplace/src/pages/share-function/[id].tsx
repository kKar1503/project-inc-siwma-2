// ** React Imports
import { useState } from 'react';

// ** Next Imports
import { useRouter } from 'next/router';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Custom Components Imports
import ListingCard from '@/components/ListingCard';
import ProfileDetailCard from '@/components/marketplace/profile/ProfileDetailCard';
import ShareModal from '@/components/modal/ShareModal';

// ** HooksImports
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import fetchCompany from '@/middlewares/fetchCompany';

const useGetUser = (userUuid: string) => {
  const { data } = useQuery('userData', async () => fetchCompany(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

// function to seperate string based on -
const splitString = (str: string) => str.split('-');

const ShareFunctionPage = () => {
  const router = useRouter();
  const [openShare, setOpenShare] = useState(false);
  const loggedUserUuid = useSession().data?.user.id as string;
  const userDetails = useGetUser(loggedUserUuid);
  let listingIds;

  if (router.query.id) {
    listingIds = splitString(router.query.id as string);
  }
  return (
    <main>
      <Box
        sx={({ spacing }) => ({
          px: spacing(5),
          mt: spacing(2),
        })}
      >
        <Box
          sx={({ spacing }) => ({
            display: 'flex',
            gap: spacing(3),
          })}
        >
          {userDetails && <ProfileDetailCard data={userDetails} />}
          {/* map listing cards based on listing Ids */}
          <Box sx={{ height: '70vh', overflow: 'auto', width: '100%' }}>
            {listingIds?.map((id) => (
              <ListingCard key={id} listingId={id} />
            ))}
          </Box>
        </Box>
        <Box
          sx={({ spacing }) => ({
            marginTop: spacing(2),
            mr: spacing(2),
          })}
        >
          <Button
            onClick={() => setOpenShare(true)}
            variant="contained"
            size="large"
            sx={({ typography }) => ({
              display: 'flex',
              justifyContent: 'flex-end', // Aligns the button to the right
              marginLeft: 'auto',
              fontSize: typography.h6,
            })}
          >
            Share
          </Button>
          <ShareModal
            open={openShare}
            setOpen={setOpenShare}
            title="Share this listing!"
            content="Share this link with anyone!"
            // gets current link and allows user to copy it
            link={process.env.FRONTEND_URL + router.asPath}
          />
        </Box>
      </Box>
    </main>
  );
};

export default ShareFunctionPage;
