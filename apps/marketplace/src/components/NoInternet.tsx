import { useState, useEffect, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NoInternetConnection = ({ children }: { children: ReactNode }) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener('online', () => {
    setOnline(true);
  });

  window.addEventListener('offline', () => {
    setOnline(false);
  });

  // if user is online, return the child component else return error
  if (isOnline) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  return (
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
          SERVICE UNAVAILABLE!
        </Typography>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.body1,
          })}
        >
          Service unavailable, please check network connection.
        </Typography>
      </Box>
    </Box>
  );
};

NoInternetConnection.includeNavbar = false;

export default NoInternetConnection;
