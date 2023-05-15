import { Chip } from '@mui/material';

const SellBadge = () => (
  <Chip
    sx={({ spacing, palette }) => ({
      mr: spacing(1),
      bgcolor: palette.error[500],
      fontWeight: 'bold',
      color: palette.common.white,
    })}
    label="Selling"
  />
);

export default SellBadge;
