import { Box } from '@mui/material';
import Spinner from '../Spinner';

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
