import { useMediaQuery, useTheme } from '@mui/material';
import type { Breakpoint } from '@mui/material';


export default function useResponsiveness(breakpoints: Breakpoint[]) {
  const { sm, md, lg } = useTheme().breakpoints.values;

  const isSm: boolean = useMediaQuery(`(min-width:${sm}px)`);
  const isMd: boolean = useMediaQuery(`(min-width: ${md}px)`);
  const isLg: boolean = useMediaQuery(`(min-width: ${lg}px)`);

  const bpMap = {
    sm: isSm,
    md: isMd,
    lg: isLg,
  };

  const isBp: boolean[] = breakpoints.map((bp: Breakpoint) => bpMap[bp]);

  return isBp;
}