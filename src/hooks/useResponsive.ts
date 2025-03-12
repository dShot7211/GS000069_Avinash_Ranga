import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type ResponsiveQuery = 'up' | 'down' | 'between' | 'only';
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function useResponsive(query: ResponsiveQuery, start: Breakpoint, end?: Breakpoint): Boolean {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));
  const mediaDown = useMediaQuery(theme.breakpoints.down(start));
  const mediaBetween = end ? useMediaQuery(theme.breakpoints.between(start, end)) : false;
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth(): Breakpoint {
  const theme = useTheme();

  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse() as Breakpoint[];

  return (
    keys.reduce<Breakpoint | null>((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs' // if no match, return 'xs'
  );
}
