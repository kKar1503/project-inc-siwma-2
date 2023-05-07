// ** Type Import
import type { ThemeOptions as TThemeOptions } from '@mui/material';

// ** Theme Override Imports
import palette from './palette';
import spacing from './spacing';
import shadows from './shadows';
import breakpoints from './breakpoints';
import typography from './typography';
import zIndex from './zIndex';

const GenerateThemeOptions = (): TThemeOptions => ({
  breakpoints,
  palette,
  typography,
  zIndex,
  shadows,
  spacing,
  shape: {
    borderRadius: 4,
  },
});

export default GenerateThemeOptions;
