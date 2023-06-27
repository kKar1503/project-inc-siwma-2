import React from 'react';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SellBadge = () => {
  const { t } = useTranslation();

  return (
    <Chip
      sx={({ palette }) => ({
        // mr: spacing(1),
        bgcolor: palette.error[500],
        fontWeight: 'bold',
        color: palette.common.white,
        width: '48px',
      })}
      label={t('Sell')}
    />
  );
};

export default SellBadge;
