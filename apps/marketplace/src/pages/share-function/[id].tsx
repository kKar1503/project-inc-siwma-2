// ** React Imports
import { useState, useMemo, useEffect } from 'react';

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

// ** Services
import useUser from '@/services/users/useUser';
import useShareFunc from '@/services/share-function/useShareFunc';

// ** Packages
import { useResponsiveness } from '@inc/ui';

// ** i18n import
import { useTranslation } from 'react-i18next';

const ShareFunctionPage = () => {
  const router = useRouter();
  const [openShare, setOpenShare] = useState(false);
  // ** Fetches the share data based on the hash
  const {
    data: shareData,
    error: shareError,
    isError: isShareError,
    isFetched: isShareFetched,
  } = useShareFunc(router.query.id as string);

  const {
    data: userDetails,
    error: userError,
    isError: isUserError,
    isFetched: isUserFetched,
  } = useUser(shareData?.ownerId as string);

  // ** Effects
  useEffect(() => {
    if (!isUserFetched || !isShareError) {
      return;
    }

    if (isUserError || isShareError) {
      if ('status' in (userError as any) && (userError as any).status === 404) {
        router.replace('/404');
        return;
      }

      router.replace('/500');
      return;
    }

    if (userDetails === undefined || shareData === undefined) {
      router.replace('/500');
    }
  }, [isUserFetched, isShareFetched]);

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const theme = useTheme();
  const { spacing } = theme;
  const { t } = useTranslation();
  let listingIds;

  if (router.query.id) {
    listingIds = shareData?.listingItems;
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
          height: '75vh',
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
        height: '75vh',
        overflow: 'auto',
        width: '100%',
      },
    };
  }, [isSm, isMd, isLg]);

  return (
    <main>
      <Box sx={spaceStyle.outerSpace}>
        <Box sx={spaceStyle.boxStyle}>
          {userDetails && <ProfileDetailCard data={userDetails} visibleEditButton />}
          {/* map listing cards based on listing Ids */}
          {shareData && (
            <Box sx={spaceStyle.scrollBox}>
              {listingIds?.map((id) => (
                <ListingCard key={id} listingId={id} />
              ))}
            </Box>
          )}
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
            {t('Share')}
          </Button>
          <ShareModal
            open={openShare}
            setOpen={setOpenShare}
            title="Share this listing!"
            content="Share this link with anyone!"
            // gets current link and allows user to copy it
            link={window.location.href}
          />
        </Box>
      </Box>
    </main>
  );
};

export default ShareFunctionPage;
