import { ReactNode, Children, useEffect, useRef, ComponentType } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface InfiniteScrollProps {
  children: ReactNode[];
  onLoadMore: () => void;
  loading: boolean;
  reachedMaxItems: boolean;
  parent: ComponentType<any>;
  parentProps: any;
  child: ComponentType<any>;
  childProps: any;
}

const InfiniteScroll = ({
  children,
  onLoadMore,
  loading,
  reachedMaxItems,
  parent: Parent,
  parentProps,
  child: Child,
  childProps,
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

      <Parent {...parentProps}>
        {children !== null &&
          children !== undefined &&
          Children.map(children, (child, index) => {
            if (index === children.length - 1) {
              return (
                <Child ref={lastItemRef} key={index}>
                  {child}
                </Child>
              );
            }
            return <Child key={index}>{child}</Child>;
          })}
      </Parent>
    </>
  );
};

export default InfiniteScroll;
