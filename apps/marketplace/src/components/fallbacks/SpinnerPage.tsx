import Box from '@mui/material/Box';
import Spinner from './Spinner';

/**
 * Spinner page that is used as a fallback
 * when something else is loading.
 */
const SpinnerPage = () => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
  >
    <Spinner />
  </Box>
);

SpinnerPage.allowNonAuthenticated = true;
SpinnerPage.allowAuthenticated = true;

export default SpinnerPage;
