import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useResponsiveness } from '@inc/ui';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const AddListing = () => {
  const { t } = useTranslation();
  const { palette, typography } = useTheme();
  const router = useRouter();

  const [isMd] = useResponsiveness(['md']);

  const handleUrl = (url: string) => {
    if (router.pathname !== url) {
      router.push(url);
    }
  };

  return (
    <Box onClick={() => handleUrl('/listings/create')}>
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
    </Box>
  );
};
export default AddListing;
