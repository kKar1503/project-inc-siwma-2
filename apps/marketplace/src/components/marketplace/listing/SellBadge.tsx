import { Chip } from '@mui/material';

const SellBadge = () => (
  <Chip
    sx={({ palette }) => ({
      // mr: spacing(1),
      bgcolor: palette.error[500],
      fontWeight: 'bold',
      color: palette.common.white,
    })}
    label="Sell"
  />
);

export default SellBadge;
