import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const ErrorPage = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#F5F5F5',
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        sx={({ typography }) => ({
          fontSize: typography.h1,
        })}
      >
        SOMETHING WENT WRONG!
      </Typography>
      <Typography
        sx={({ typography }) => ({
          fontSize: typography.body1,
        })}
      >
        {`Something went wrong, and we don't know what it is.`}
      </Typography>
      <Link href="/overview">
        <Button sx={({ spacing }) => ({ mt: spacing(2) })} variant="contained">
          Back to Home
        </Button>
      </Link>
    </Box>
  </Box>
);

ErrorPage.includeNavbar = false;

export default ErrorPage;
