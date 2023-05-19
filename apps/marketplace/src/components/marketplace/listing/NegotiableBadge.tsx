import { Chip } from '@mui/material';

const NegotiableBadge = () => (
  <Chip
    sx={({ spacing, palette }) => ({
      mr: spacing(1),
      bgcolor: palette.info[600],
      fontWeight: 500,
      color: palette.common.white,
    })}
    label="Negotiable"
  />
);

export default NegotiableBadge;
