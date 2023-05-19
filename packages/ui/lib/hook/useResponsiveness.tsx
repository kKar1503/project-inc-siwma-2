import { useMediaQuery, useTheme } from '@mui/material';
import type { Breakpoint } from '@mui/material';


export default function useResponsiveness(breakpoints: Breakpoint[]) {
  const { xs, sm, md, lg, xl } = useTheme().breakpoints.values;

  const isXs: boolean = useMediaQuery(`(min-width: ${xs}px)`);
  const isSm: boolean = useMediaQuery(`(min-width:${sm}px)`);
  const isMd: boolean = useMediaQuery(`(min-width: ${md}px)`);
  const isLg: boolean = useMediaQuery(`(min-width: ${lg}px)`);
  const isXl: boolean = useMediaQuery(`(min-width: ${xl}px)`);

  const bpMap = {
    xs: isXs,
    sm: isSm,
    md: isMd,
    lg: isLg,
    xl: isXl,
  };

  const isBp: boolean[] = breakpoints.map((bp: Breakpoint) => bpMap[bp]);

  return isBp;
}