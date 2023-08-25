import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import CompareDifferences from '@/components/tables/CompareDifferencesTable';
import NoInternetConnection from '@/components/NoInternet';

const Compare = () => {
  let listingIds: string[] = [];
  const urlParts = window.location.pathname.split('/compare/');

  if (urlParts.length > 1 && urlParts[1] !== '') {
    listingIds = urlParts[1].split(',');
  }

  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const tableStyle = useMemo(() => {
    if (isSm) {
      return {
        py: spacing(3),
        px: '20px',
      };
    }
    if (isMd) {
      return {
        py: spacing(3),
        px: '40px',
      };
    }
    if (isLg) {
      return {
        py: spacing(3),
        px: '60px',
      };
    }
    return {
      py: spacing(3),
      px: '20px',
    };
  }, [isSm, isMd, isLg]);

  return (
    <Container>
      <Box
        sx={({ spacing }) => ({
          mb: spacing(2),
        })}
      >
        <Typography
          sx={({ spacing, typography }) => ({
            py: spacing(3),
            fontSize: typography.h5,
            fontWeight: 'bold',
          })}
        >
          Compare Differences
        </Typography>
        <CompareDifferences listingIds={listingIds} />
      </Box>
      {/* <NoInternetConnection /> */}
    </Container>
  );
};

export default Compare;
