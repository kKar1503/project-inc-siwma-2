import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const AddListing = () => {
  const { t } = useTranslation();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { palette } = useTheme();

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: palette.primary.main,
        textTransform: 'capitalize',
      }}
    >
      <Typography noWrap sx={{ color: palette.common.white, fontSize: '1em' }}>
        {t('ADD LISTINGS')}
      </Typography>
    </Button>
  );
};
export default AddListing;
