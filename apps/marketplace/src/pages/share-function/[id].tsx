// ** React Imports
import { useState, useMemo } from 'react';

// ** Next Imports
import { useRouter } from 'next/router';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

// ** Custom Components Imports
import ListingCard from '@/components/ListingCard';
import ProfileDetailCard from '@/components/marketplace/profile/ProfileDetailCard';
import ShareModal from '@/components/modal/ShareModal';

// ** HooksImports
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

// ** Middlewares
import fetchCompany from '@/middlewares/fetchCompany';

// ** Packages
import { useResponsiveness } from '@inc/ui';

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
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const theme = useTheme();
  const { spacing } = theme;
  let listingIds;

  if (router.query.id) {
    listingIds = splitString(router.query.id as string);
  }

  const spaceStyle = useMemo(() => {
    if (isSm || isMd) {
      return {
        outerSpace: {
          px: spacing(2),
          mt: spacing(1),
        },
        boxStyle: {
          gap: spacing(3),
        },
        scrollBox: {
          height: '60vh',
          overflow: 'auto',
          width: '100%',
        },
      };
    }
    if (isLg) {
      return {
        outerSpace: {
          px: spacing(3),
          mt: spacing(1),
        },
        boxStyle: {
          display: 'flex',
          gap: spacing(3),
        },
        scrollBox: {
          height: '80vh',
          overflow: 'auto',
          width: '100%',
        },
      };
    }
    return {
      outerSpace: {
        px: spacing(3),
        mt: spacing(1),
      },
      boxStyle: {
        display: 'flex',
        gap: spacing(3),
      },
      scrollBox: {
        height: '80vh',
        overflow: 'auto',
        width: '100%',
      },
    };
  }, [isSm, isMd, isLg]);
  
  return (
    <main>
      <Box sx={spaceStyle.outerSpace}>
        <Box sx={spaceStyle.boxStyle}>
          {userDetails && <ProfileDetailCard data={userDetails} />}
          {/* map listing cards based on listing Ids */}
          <Box sx={spaceStyle.scrollBox}>
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
