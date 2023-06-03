import { Chip } from '@mui/material';

const BuyBadge = () => (
  <Chip
    sx={({ palette }) => ({
      // mr: spacing(1),
      bgcolor: palette.secondary[500],
      fontWeight: 'bold',
      color: palette.common.white,
    })}
    label="Buy"
  />
);

export default BuyBadge;
