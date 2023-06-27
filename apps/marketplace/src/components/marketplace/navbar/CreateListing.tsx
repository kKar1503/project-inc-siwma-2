import React, { useMemo } from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useResponsiveness } from '@inc/ui';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const AddListing = () => {
  const { t } = useTranslation();
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
    <Link href="/create-listing" underline="none">
      <Button
        variant="contained"
        sx={{
          backgroundColor: palette.primary.main,
          textTransform: 'capitalize',
          width: isMd ? '150px' : '125px',
        }}
      >
        <Typography noWrap sx={addListingStyles?.textBtn}>
          {t('CREATE LISTING')}
        </Typography>
      </Button>
    </Link>
  );
};
export default AddListing;
