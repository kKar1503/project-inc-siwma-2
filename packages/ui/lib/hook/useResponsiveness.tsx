import { useMediaQuery, useTheme } from '@mui/material';
import type { Breakpoint } from '@mui/material';

export default function useResponsiveness(breakpoints: Breakpoint[]) {
  const { sm, md, lg } = useTheme().breakpoints.values;

  const isSm: boolean = useMediaQuery(`(max-width: ${md - 1}px)`);
  const isMd: boolean = useMediaQuery(`(min-width: ${md}px) and (max-width:${lg - 1}px)`);
  const isLg: boolean = useMediaQuery(`(min-width: ${lg}px) and (max-width: 99999px)`);

  const bpMap = {
    sm: isSm,
    md: isMd,
    lg: isLg,
  };

  const isBp: boolean[] = breakpoints.map((bp: Breakpoint) => bpMap[bp]) as boolean[];

  return isBp;
}
