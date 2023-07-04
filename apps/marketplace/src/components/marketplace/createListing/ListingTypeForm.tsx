import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

export type ListingTypeProps = 'BUY' | 'SELL';

export type ListingTypeFormProps = {
  listingType?: ListingTypeProps;
  setListingType: (type: ListingTypeProps) => void;
  disabled?: boolean;
};

const ListingTypeForm = ({ listingType, setListingType, disabled }: ListingTypeFormProps) => {
  const [selectedButton, setSelectedButton] = useState<ListingTypeProps>('BUY');
  const { t } = useTranslation();

  const handleButtonClick = (type: ListingTypeProps) => {
    setListingType(type);
    setSelectedButton(type);
  };

  useEffect(() => {
    if (listingType) setSelectedButton(listingType);
  }, [listingType]);

  return (
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={6} md={6} sx={{ width: '100%', pr: 1 }}>
          <Button
            size="large"
            variant={selectedButton === 'BUY' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('BUY')}
            fullWidth
            disabled={disabled}
          >
            {t('BUYING')}
          </Button>
        </Grid>
        <Grid item xs={6} md={6} sx={{ width: '100%', pl: 1 }}>
          <Button
            size="large"
            variant={selectedButton === 'SELL' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('SELL')}
            fullWidth
            disabled={disabled}
          >
            {t('SELLING')}
          </Button>
        </Grid>
      </div>
    </Grid>
  );
};

export default ListingTypeForm;
