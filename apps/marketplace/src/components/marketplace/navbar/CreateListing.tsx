import React from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const AddListing = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  return (
    <Link href="/create-listing" underline="none">
      <Button
        variant="contained"
        sx={{
          backgroundColor: palette.primary.main,
          textTransform: 'capitalize',
        }}
      >
        <Typography noWrap sx={{ fontSize: '1em', color: palette.common.white }}>
          {t('ADD LISTINGS')}
        </Typography>
      </Button>
    </Link>
  );
};
export default AddListing;
