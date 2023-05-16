import { ReactNode, Children, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { generateString } from '@inc/utils';

interface InfiniteScrollProps {
  // FIXME: i have no clue what i am doing
  children: ReactNode[];
  onLoadMore: () => void;
  loading: boolean;
  reachedMaxItems: boolean;
  sx?: string;
  wrapperSx?: string;
}

const InfiniteScroll = ({
  children,
  onLoadMore,
  loading,
  reachedMaxItems,
  sx = '',
  wrapperSx = '',
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
        observerRef.current.unobserve(lastItem);
      }
    };
  }, [children, lastItemRef, loading, onLoadMore, reachedMaxItems]);

  return (
    <>
      <Box sx={{ sx }}>
        {children !== null &&
          children !== undefined &&
          Children.map(children, (child, index) => {
            if (index === children.length - 1) {
              return (
                <Box key={generateString(4)} sx={{ wrapperSx }} ref={lastItemRef}>
                  sx.
                  {child}
                </Box>
              );
            }
            return (
              <Box key={generateString(4)} sx={{ wrapperSx }}>
                {child}
              </Box>
            );
          })}
      </Box>

      {loading && <Box className="text-center my-5">Loading more items...</Box>}
      {reachedMaxItems && (
        <Box className="text-center my-5">You&apos;ve reached the end of the universe!</Box>
      )}
    </>
  );
};

export default InfiniteScroll;
