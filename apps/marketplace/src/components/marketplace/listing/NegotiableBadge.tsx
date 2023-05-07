import { Chip } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// warning color not included in palette, created here for negotiable tag use
// yellow was an option but too bright for user
const theme = createTheme({
  palette: {
    warning: {
      main: '#ed6c02',
    },
  },
});

const NegotiableBadge = () => (
  <Chip
    sx={({ spacing, palette }) => ({
      mr: spacing(1),
      bgcolor: theme.palette.warning.main,
      fontWeight: 'bold',
      color: palette.common.white,
    })}
    label="Negotiable"
  />
);

export default NegotiableBadge;
