// ** React Import
import type { ReactNode } from 'react';

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// ** Theme
import generateThemeOptions from './theme';

export type MuiThemeProps = {
  children: ReactNode;
  fonts?: string;
};

const MuiTheme = ({ children, fonts = '' }: MuiThemeProps) => {
  // ** Creates core theme options
  const coreThemeConfig = generateThemeOptions();

  coreThemeConfig.typography = {
    ...coreThemeConfig.typography,
    fontFamily: [
      fonts.replace(/[\s']/g, ''),
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  };

  // ** Pass ThemeOptions to CreateTheme Function to create theme
  let theme = createTheme(coreThemeConfig);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
