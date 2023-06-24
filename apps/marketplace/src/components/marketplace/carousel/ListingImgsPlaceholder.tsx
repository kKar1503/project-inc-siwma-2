import { Box, Typography } from '@mui/material';

const ListingImgsPlaceholder = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '2em' }}>
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
