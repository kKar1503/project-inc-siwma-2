import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import placeholder from 'public/images/listing-placeholder.svg';

import Image from 'next/image';

const ListingImgsPlaceholder = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '2em' }}>
    <div style={{ height: '100%', width: '100%' }}>
      <Image src='/images/listing-placeholder.svg' alt='placeholder' />
    </div>
    <Typography
      sx={({ typography, palette }) => ({
        color: palette.error.main,
        fontWeight: typography.fontWeightMedium,
        fontSize: '32px',
        textTransform: 'uppercase',
      })}
    >
      No Images available
    </Typography>
  </Box>
);

export default ListingImgsPlaceholder;
