import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export type ListingTypeProps = 'Buying' | 'Selling';

export type ListingTypeFormProps = {
  setListingType: (type: string) => void;
};

const ListingTypeForm = ({ setListingType }: ListingTypeFormProps) => {
  const [selectedButton, setSelectedButton] = useState<ListingTypeProps>();

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
            variant={selectedButton === 'Buying' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('Buying')}
            fullWidth
          >
            BUYING
          </Button>
        </Grid>
        <Grid item xs={6} md={6} sx={{ width: '100%', pl: 1 }}>
          <Button
            size="large"
            variant={selectedButton === 'Selling' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('Selling')}
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
