import React from 'react';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NegotiableBadge = () => {
  const { t } = useTranslation();

  return (
    <Chip
      sx={({ palette }) => ({
        bgcolor: palette.info[600],
        fontWeight: 500,
        color: palette.common.white,
        width: '96px',
      })}
      label={t('Negotiable')}
    />
  );
};

export default NegotiableBadge;
