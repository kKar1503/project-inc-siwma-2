import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    body1: {
      color: '#000',
    },
  },
  palette: {
    warning: {
      main: '#D32F2F',
    },
    background: {
      default: '#F5F5F5',
    },
  },
});

export default theme;
