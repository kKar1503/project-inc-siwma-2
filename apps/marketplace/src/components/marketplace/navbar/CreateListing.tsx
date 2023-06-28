import React from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const AddListing = () => {
  const { t } = useTranslation();
  const { palette, typography } = useTheme();

  const [isMd] = useResponsiveness(['md']);

  return (
    <Link href="/create-listing" underline="none">
      <Button
        variant="contained"
        sx={{
          backgroundColor: palette.primary.main,
          textTransform: 'capitalize',
          width: isMd ? '150px' : '125px',
          height: '100%',
        }}
      >
        <Typography variant="subtitle2" noWrap sx={{ fontSize: 14, color: palette.common.white }}>
          {t('ADD LISTINGS')}
        </Typography>
      </Button>
    </Link>
  );
};
export default AddListing;
