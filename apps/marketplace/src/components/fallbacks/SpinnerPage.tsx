import Box from '@mui/material/Box';
import Spinner from '../Spinner';

const SpinnerPage = () => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        flexDirection: 'column',
        gap: '0.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '28rem',
        height: '100%',
      }}
    >
      <Spinner />
    </Box>
  </Box>
);

SpinnerPage.allowNonAuthenticated = true;
SpinnerPage.allowAuthenticated = true;

export default SpinnerPage;
