import { Box, Typography } from '@mui/material';

const AdvertisementsPlaceholder = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '2em' }}>
    <Typography
      variant="h1"
      sx={{ fontSize: '32px', color: '#C0C2C9', textTransform: 'uppercase' }}
    >
      No Advertisements available
    </Typography>
  </Box>
);

export default AdvertisementsPlaceholder;
