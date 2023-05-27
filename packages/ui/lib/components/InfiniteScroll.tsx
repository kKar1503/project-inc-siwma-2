import { ReactNode, Children, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { generateString } from '@inc/utils';
import { Grid, SxProps, Theme } from '@mui/material';

interface InfiniteScrollProps {
  children: ReactNode[];
  onLoadMore: () => void;
  loading: boolean;
  reachedMaxItems: boolean;
  sx?: SxProps<Theme>;
  wrapperSx?: SxProps<Theme>;
}

const InfiniteScroll = ({
  children,
  onLoadMore,
  loading,
  reachedMaxItems,
  sx = {},
  wrapperSx = {},
}: InfiniteScrollProps) => {
  const lastItemRef = useRef<Element>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    let lastItem: Element;

    if (lastItemRef.current) {
      lastItem = lastItemRef.current;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (reachedMaxItems || loading) return;
            onLoadMore();
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(lastItemRef.current);
    }

    return () => {
      if (lastItem) {
        lastItem.scrollTo(0, lastItem.scrollHeight);
        observerRef.current.unobserve(lastItem);
      }
    };
  }, [children, lastItemRef, onLoadMore, reachedMaxItems]);

  return (
    <>
      {loading && <CircularProgress />}
      <Grid container spacing={2} width="80%" sx={sx}>
        {children !== null &&
          children !== undefined &&
          Children.map(children, (child, index) => {
            if (index === children.length - 1) {
              return (
                <Grid
                  item
                  xl={2}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  key={generateString(4)}
                  sx={wrapperSx}
                >
                  {child}
                </Grid>
              );
            }
            return (
              <Grid key={generateString(4)} sx={wrapperSx}>
                {child}
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default InfiniteScroll;
