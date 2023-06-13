import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';

const AddListing = () => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { palette } = useTheme();

  const addListingStyles = useMemo(() => {
    if (isSm) {
      return {
        textBtn: {
          fontSize: '0.5rem',
          color: palette.common.white,
        },
      };
    }
    if (isMd) {
      return {
        textBtn: {
          fontSize: '0.6rem',
          color: palette.common.white,
        },
      };
    }
    if (isLg) {
      return {
        textBtn: {
          fontSize: '0.8rem',
          color: palette.common.white,
        },
      };
    }
    return {
      textBtn: {
        fontSize: '0.8rem',
        color: palette.common.white,
      },
    };
  }, [isSm, isMd, isLg]);

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: palette.primary.main,
        textTransform: 'capitalize',
      }}
    >
      <Typography noWrap sx={addListingStyles?.textBtn}>
        ADD LISTINGS
      </Typography>
    </Button>
  );
};
export default AddListing;
