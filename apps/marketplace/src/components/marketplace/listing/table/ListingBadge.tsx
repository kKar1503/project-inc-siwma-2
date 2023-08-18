import React from 'react';
import Chip from '@mui/material/Chip';
import { Palette } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useResponsiveness } from '@inc/ui';

type ListingBadgeProps = {
  type: 'sell' | 'buy' | 'negotiable';
};

// Map the listing type to the text to display
const listingTypeMap = {
  sell: 'Sell',
  buy: 'Buy',
  negotiable: 'Negotiable',
};

const ListingBadge = ({ type }: ListingBadgeProps) => {
  // Hooks
  const { t } = useTranslation();
  const [isSm] = useResponsiveness(['sm']);

  // Derive the badge colour
  const getBadgeColor = (palette: Palette) => {
    switch (type) {
      case 'sell':
        return palette.error[500];
      case 'buy':
        return palette.secondary[500];
      case 'negotiable':
        return palette.info[600];
      default:
        return palette.error[500];
    }
  };

  return (
    <Chip
      sx={({ palette }) => ({
        // mr: spacing(1),
        bgcolor: getBadgeColor(palette),
        fontWeight: 'bold',
        color: palette.common.white,
        height: isSm ? 24 : undefined,
      })}
      label={t(listingTypeMap[type])}
    />
  );
};

export default ListingBadge;
