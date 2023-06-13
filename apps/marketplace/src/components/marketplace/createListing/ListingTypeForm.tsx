import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export type ListingTypeProps = 'BUY' | 'SELL';

export type ListingTypeFormProps = {
  setListingType: (type: ListingTypeProps) => void;
  data?: ListingTypeProps;
  disabled: boolean;
};

const ListingTypeForm = ({ setListingType, data, disabled }: ListingTypeFormProps) => {
  const [selectedButton, setSelectedButton] = useState<ListingTypeProps>(data || 'BUY');

  const handleButtonClick = (type: ListingTypeProps) => {
    setListingType(type);
    setSelectedButton(type);
  };

  useEffect(() => {
    if (data) setSelectedButton(data);
  }, [data]);

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
            BUYING
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
            SELLING
          </Button>
        </Grid>
      </div>
    </Grid>
  );
};

export default ListingTypeForm;
