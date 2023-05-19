import { Chip } from '@mui/material';

const NegotiableBadge = () => (
  <Chip
    sx={{
      color: '#FFFFFF',
      fontWeight: 'bold',
      mr: 1,
    }}
    color="warning"
    label="Negotiable"
  />
);

export default NegotiableBadge;
