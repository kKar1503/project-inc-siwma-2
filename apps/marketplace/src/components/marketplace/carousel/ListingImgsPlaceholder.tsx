import { Box, Typography } from '@mui/material';

const ListingImgsPlaceholder = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '2em' }}>
    <Typography variant='h1' sx={{fontSize: '32px', color: 'red', textTransform: 'uppercase'}}>No Images available</Typography>
  </Box>
);

export default ListingImgsPlaceholder;