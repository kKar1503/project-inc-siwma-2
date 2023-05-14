// ** Type Import
import type { ThemeOptions } from '@mui/material';

type TypographyOptions = ThemeOptions['typography'];

const Typography: TypographyOptions = (palette) => ({
  fontFamily: [
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
  h1: {
    fontWeight: 500,
    letterSpacing: '-1.5px',
    color: palette.text.primary,
  },
  h2: {
    fontWeight: 500,
    letterSpacing: '-0.5px',
    color: palette.text.primary,
  },
  h3: {
    fontWeight: 500,
    letterSpacing: 0,
    color: palette.text.primary,
  },
  h4: {
    fontWeight: 500,
    letterSpacing: '0.25px',
    color: palette.text.primary,
  },
  h5: {
    fontWeight: 500,
    letterSpacing: 0,
    color: palette.text.primary,
  },
  h6: {
    letterSpacing: '0.15px',
    color: palette.text.primary,
  },
  subtitle1: {
    letterSpacing: '0.15px',
    color: palette.text.primary,
  },
  subtitle2: {
    letterSpacing: '0.1px',
    color: palette.text.secondary,
  },
  body1: {
    letterSpacing: '0.15px',
    color: palette.text.primary,
  },
  body2: {
    lineHeight: 1.429,
    letterSpacing: '0.15px',
    color: palette.text.secondary,
  },
  button: {
    letterSpacing: '0.4px',
    color: palette.text.primary,
  },
  caption: {
    lineHeight: 1.25,
    letterSpacing: '0.4px',
    color: palette.text.secondary,
  },
  overline: {
    letterSpacing: '1px',
    color: palette.text.secondary,
  },
});

export default Typography;
