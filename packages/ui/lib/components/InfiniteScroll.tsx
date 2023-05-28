import { ReactNode, Children, useEffect, useRef, Component } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface InfiniteScrollProps {
  children: ReactNode[];
  onLoadMore: () => void;
  loading: boolean;
  reachedMaxItems: boolean;
  parent: Component;
  child: Component;
}

const InfiniteScroll = ({
  children,
  onLoadMore,
  loading,
  reachedMaxItems,
  parent: Parent,
  child: Child,
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
      <Parent>
        {children !== null &&
          children !== undefined &&
          Children.map(children, (child, index) => {
            if (index === children.length - 1) {
              return <Child ref={lastItemRef}>{child}</Child>;
            }
            return <Child>{child}</Child>;
          })}
      </Parent>
    </>
  );
};

export default InfiniteScroll;
