import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AddListing = () => (
  <Button
    variant="contained"
    sx={({ palette }) => ({
      backgroundColor: palette.primary.main,
      textTransform: 'capitalize',
    })}
  >
    <Typography
      noWrap
      sx={({ typography }) => ({
        fontSize: typography.subtitle2,
      })}
    >
      Add Listings
    </Typography>
  </Button>
);

export default AddListing;
