// ** React Import
import type { ReactNode } from 'react';

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// ** Theme
import generateThemeOptions from './theme';

export type MuiThemeProps = {
  children: ReactNode;
};

const MuiTheme = ({ children }: MuiThemeProps) => {
  // ** Creates core theme options
  const coreThemeConfig = generateThemeOptions();

  // ** Pass ThemeOptions to CreateTheme Function to create theme
  let theme = createTheme(coreThemeConfig);

  theme.components = {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Heiti';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Heiti'), local('Heiti'), url('../fonts/Adobe-Heiti-Std-R.otf') format('opentype');
          unicodeRange: U+4E00-9FFF;
        }
      `,
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
