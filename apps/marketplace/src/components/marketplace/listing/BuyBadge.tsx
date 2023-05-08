import { Chip } from '@mui/material';

const BuyBadge = () => (
  <Chip
    sx={({ spacing, palette }) => ({
      mr: spacing(1),
      bgcolor: palette.secondary[300],
      fontWeight: 'bold',
      color: palette.common.white,
    })}
    label="Buying"
  />
);

export default BuyBadge;
