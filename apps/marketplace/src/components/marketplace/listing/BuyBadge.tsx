import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const BuyBadge = () => {
  const theme = useTheme();

  return (
    <Chip
      // sx={{
      //   backgroundColor: '#34D399',
      //   color: '#FFFFFF',
      //   fontWeight: 'bold',
      //   mr: 0.5,
      // }}
      label="Buying"
      sx={({ spacing, palette }) => ({
        mr: spacing(1),
        bgcolor: palette.secondary[300],
        fontWeight: 'bold',
        color: palette.common.white,
      })}
    />
  );
};

export default BuyBadge;
