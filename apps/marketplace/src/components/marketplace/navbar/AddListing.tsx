import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AddListing = () => (

    <Button variant="contained" size='small' sx={{backgroundColor: '#2962FF', textTransform: 'capitalize'}}>
      <Typography
        noWrap
        fontSize={13}
        color='#FFFFF'
      >
        Add Listings
      </Typography>
    </Button>

)

export default AddListing;