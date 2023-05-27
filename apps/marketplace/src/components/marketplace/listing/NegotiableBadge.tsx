import { Chip } from '@mui/material';

const NegotiableBadge = () => (
  <Chip
    sx={({ palette }) => ({
      bgcolor: palette.info[600],
      fontWeight: 500,
      color: palette.common.white,
    })}
    label="Negotiate"
  />
);

export default NegotiableBadge;
