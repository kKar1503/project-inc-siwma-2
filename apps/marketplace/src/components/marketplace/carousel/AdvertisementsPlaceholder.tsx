import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import placeholder from 'public/images/advertisement-placeholder.png';

const AdvertisementsPlaceholder = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: '2em' }}>
    <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>
      <Image src={placeholder} alt="placeholder" />
    </div>
    <Typography
      variant="h1"
      sx={{ fontSize: '32px', color: '#C0C2C9', textTransform: 'uppercase', paddingTop: '1' }}
    >
      No Advertisements available
    </Typography>
  </Box>
);

export default AdvertisementsPlaceholder;
