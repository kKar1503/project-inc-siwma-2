import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    body1: {
      color: '#000',
    },
  },
  palette: {
    primary: {
      main: '#2962FF',
    },
    warning: {
      main: '#D32F2F',
    },
    background: {
      default: '#F5F5F5',
    },
  },
});

export default theme;
