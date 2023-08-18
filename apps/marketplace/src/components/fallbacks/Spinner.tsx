import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
/**
 * Loading spinner
 */
const Spinner = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={({ spacing }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing(2),
      })}
      role="status"
    >
      <Typography variant="h4" gutterBottom>
        {t('Loading...')}
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
