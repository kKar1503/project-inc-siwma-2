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
        OOPS!
      </Typography>
      <Typography
        sx={({ typography }) => ({
          fontSize: typography.body1,
        })}
      >
        This page you are looking for might have been removed or temporarily unavailable
      </Typography>
      <Link href="/overview">
        <Button sx={({ spacing }) => ({ mt: spacing(2) })} variant="contained">
          Back to Home
        </Button>
      </Link>
    </Box>
  </Box>
);

ErrorPage.includeSideBar = false;

export default ErrorPage;
