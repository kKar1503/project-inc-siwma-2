import { Box, CircularProgress } from '@mui/material';
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
      {t('Loading...')}
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
