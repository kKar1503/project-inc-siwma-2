// ** React Imports
import { useEffect, useMemo } from 'react';

// ** Next Imports
import Head from 'next/head';
import { useRouter } from 'next/router';

// ** MUI Imports
import Box from '@mui/material/Box';

// ** Custom Components Imports
import ProfileDetailCard from '@/components/marketplace/profile/ProfileDetailCard';

// ** HooksImports
import { useTheme } from '@mui/material/styles';
import { useResponsiveness } from '@inc/ui';
import useUser from '@/services/users/useUser';

const ProfilePage = () => {
  // ** Hooks
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: user,
    error: userError,
    isError: isUserError,
    isFetched: isUserFetched,
  } = useUser(id);
  const theme = useTheme();
  const { spacing } = theme;
  const [isMd, isLg] = useResponsiveness(['md', 'lg']);

  // ** Effects
  useEffect(() => {
    if (!isUserFetched) {
      return;
    }

    if (isUserError) {
      if ('status' in (userError as any) && (userError as any).status === 404) {
        router.replace('/404');
        return;
      }

      router.replace('/500');
      return;
    }

    if (user === undefined) {
      router.replace('/500');
    }
  }, [isUserFetched]);

  // ** Styles
  const spaceStyle = useMemo(() => {
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
  }, [isMd, isLg]);

  return (
    <main>
      <Box sx={spaceStyle}>
        {user && <ProfileDetailCard data={user} visibleEditButton />}
        <Box
          sx={{
            width: isLg ? '73%' : '100%',
            height: 'full',
            bgcolor: theme.palette.common.white,
            borderRadius: theme.shape,
            overflow: 'hidden',
          }}
        >
          {/* nth here */}
        </Box>
      </Box>
    </main>
  );
};

export default ProfilePage;
