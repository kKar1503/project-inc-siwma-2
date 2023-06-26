import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export type ListingTypeProps = 'BUY' | 'SELL';

export type ListingTypeFormProps = {
  setListingType: (type: ListingTypeProps) => void;
};

const ListingTypeForm = ({ setListingType }: ListingTypeFormProps) => {
  const [selectedButton, setSelectedButton] = useState<ListingTypeProps>('BUY');

  const handleButtonClick = (type: ListingTypeProps) => {
    setListingType(type);
    setSelectedButton(type);
  };

  return (
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={6} md={6} sx={{ width: '100%', pr: 1 }}>
          <Button
            size="large"
            variant={selectedButton === 'BUY' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('BUY')}
            fullWidth
          >
            BUYING
          </Button>
        </Grid>
        <Grid item xs={6} md={6} sx={{ width: '100%', pl: 1 }}>
          <Button
            size="large"
            variant={selectedButton === 'SELL' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('SELL')}
            fullWidth
          >
            SELLING
          </Button>
        </Grid>
      </div>
    </Grid>
  );
};

export default ListingTypeForm;
