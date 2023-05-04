import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AddListing = () => (

    <Button variant="contained" size='small' sx={{backgroundColor: '#2962FF'}}>
      <Typography
        noWrap
        fontSize={14}
        color='#FFFFF'
      >
        ADD LISTINGS
      </Typography>
    </Button>

)

export default AddListing;