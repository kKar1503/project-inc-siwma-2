import { useState, useEffect, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

ErrorPage.includeSideBar = false;

const NoInternetConnection = (props: PropsWithChildren) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);
  const { children } = props;

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
    return children;
  }
  return (
    <ErrorPage />
  );
};

export default NoInternetConnection;
