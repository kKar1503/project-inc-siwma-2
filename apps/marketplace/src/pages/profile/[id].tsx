import Head from 'next/head';
import ProfileDetailCard from '@/components/marketplace/profile/ProfileDetailCard';
import Box from '@mui/material/Box';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import fetchCompany from '@/middlewares/fetchCompany';
import { useRouter } from 'next/router';
import { useResponsiveness } from '@inc/ui';

const useGetUser = (userUuid: string) => {
  const { data } = useQuery('userdata', async () => fetchCompany(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const ProfilePage = () => {
  const id = useRouter().query.id as string;
  const userDetails = useGetUser(id);

  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

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
    <main>
      <Box sx={spaceStyle}>
        {userDetails && <ProfileDetailCard data={userDetails} visibleEditButton />}
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
