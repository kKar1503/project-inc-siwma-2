// ** Type Import
import type { PaletteOptions } from '@mui/material';
import { alpha } from '@mui/material/styles'

const mainColor = '#2962ff';

// Shades generated with https://maketintsandshades.com/
const DefaultPalette: PaletteOptions = {
  common: {
    black: '#000',
    white: '#FFF',
  },
  primary: {
    main: mainColor,
    '100': '#6991ff',
    '200': '#5481ff',
    '300': '#3e72ff',
    '400': mainColor,
    '500': '#2558e6',
    '600': '#214ecc',
    '700': '#1d45b3',
    '800': '#193b99',
  },
  secondary: {
    main: '#00c853',
    '100': '#4dd987',
    '200': '#33d375',
    '300': '#1ace64',
    '400': '#00c853',
    '500': '#00b44b',
    '600': '#00a042',
    '700': '#008c3a',
    '800': '#007832',
  },
  error: {
    main: '#d32f2f',
    '100': '#e06d6d',
    '200': '#dc5959',
    '300': '#d74444',
    '400': '#d32f2f',
    '500': '#be2a2a',
    '600': '#a92626',
    '700': '#942121',
    '800': '#7f1c1c',
  },
  warning: {
    main: '#edbf02',
    '100': '#f2d24e',
    '200': '#f1cc35',
    '300': '#efc51b',
    '400': '#edbf02',
    '500': '#d5ac02',
    '600': '#be9902',
    '700': '#a68601',
    '800': '#8e7301',
  },
  success: {
    main: '#2e7d32',
    '100': '#6da470',
    '200': '#58975b',
    '300': '#438a47',
    '400': '#2e7d32',
    '500': '#29712d',
    '600': '#256428',
    '700': '#205823',
    '800': '#1c4b1e',
  },
  info: {
    main: '#0288d1',
    '100': '#4eacdf',
    '200': '#35a0da',
    '300': '#1b94d6',
    '400': '#0288d1',
    '500': '#027abc',
    '600': '#026da7',
    '700': '#015f92',
    '800': '#01527d',
  },
  grey: {
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
  },
  text: {
    primary: '#212121',
    secondary: '#424242',
    disabled: '#9E9E9E',
  },
  divider: '#ADADAD',
  background: {
    paper: '#FFFFFF',
    default: '#F5F5F5',
  },
  action: {
    active: alpha(mainColor, 0.54),
    hover: alpha(mainColor, 0.05),
    hoverOpacity: 0.05,
    selected: alpha(mainColor, 0.08),
    disabled: alpha(mainColor, 0.26),
    disabledBackground: alpha(mainColor, 0.12),
    focus: alpha(mainColor, 0.12),
  },
};

export default DefaultPalette;
