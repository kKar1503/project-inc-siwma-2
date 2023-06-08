import { ReactNode, Children, useEffect, ComponentType, useRef } from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';

// TODO: fix typing for props of parent and child
interface InfiniteScrollProps<TParent, TChild> {
  children: ReactNode[];
  onLoadMore: () => any;
  loading: boolean;
  loadingComponent: ReactNode;
  reachedMaxItems: boolean;
  endMessage: ReactNode;
  parent: ComponentType<TParent>;
  child: ComponentType<TChild>;
  parentProps?: any;
  childProps?: any;
  fetching?: boolean;
  scrollThreshold?: number;
  inverse?: boolean;
  infiniteScrollSx?: SxProps<Theme>;
}

/**
 * @todo fix typing for props of parent and child
 * @prop {children} ReactNode[] to render
 * @prop {onLoadMore} function to call when scroll reaches bottom
 * @prop {loading} boolean to indicate if loading
 * @prop {loadingComponent} ReactNode to render when loading
 * @prop {reachedMaxItems} boolean to indicate if all items have been loaded
 * @prop {endMessage} ReactNode to render when all items have been loaded
 * @prop {parent} component to wrap children in
 * @prop {child} component to wrap each child in
 * @prop {parentProps} props to pass to parent
 * @prop {childProps} props to pass to child
 * @prop {fetching} boolean to indicate if fetching
 * @prop DEPRECATED {scrollThreshold} number to indicate how far from bottom to trigger onLoadMore
 * @prop DEPRECATED {inverse} boolean to indicate if scroll should be inverted
 * @prop {infiniteScrollSx} SxProps<Theme> to pass to InfiniteScroll
 */
const InfiniteScroll = <TParent, TChild>({
  children,
  onLoadMore,
  loading,
  loadingComponent,
  reachedMaxItems,
  endMessage,
  parent: Parent,
  child: Child,
  parentProps = {},
  childProps = {},
  fetching = false,
  // scrollThreshold = 1,
  // inverse = false,
  infiniteScrollSx = {},
}: InfiniteScrollProps<TParent, TChild>) => {
  const parentRef = useRef<Element>(null);
  const childRef = useRef<Element>(null);

  const handleScroll = (e) => {
    console.log('top', e.target.documentElement.scrollTop);
    console.log('winheight', window.innerHeight);
    console.log('height', e.target.documentElement.scrollHeight);
    console.log('childheight', childRef.current.clientHeight);
    console.log('loading', loading);
    console.log('fetching', fetching);
    console.log(
      e.target.documentElement.scrollTop + window.innerHeight <=
        e.target.documentElement.scrollHeight - childRef.current.clientHeight * 2
    );

    if (
      e.target.documentElement.scrollTop + window.innerHeight <=
        e.target.documentElement.scrollHeight - childRef.current.clientHeight * 2 ||
      (loading && fetching)
    )
      return;

    onLoadMore();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, fetching]);

  return (
    <Box sx={infiniteScrollSx}>
      {loading && fetching && loadingComponent}

        <Parent {...parentProps} ref={parentRef}>
          {children !== null &&
            children !== undefined &&
            Children.map(children, (child, index) => {
              if (index === children.length - 1) {
                return (
                  <Child {...childProps} key={index}>
                    {child}
                  </Child>
                );
              }
              return (
                <Child {...childProps} key={index} ref={childRef}>
                  {child}
                </Child>
              );
            })}
        </Parent>

      {reachedMaxItems && endMessage}
    </Box>
  );
};

export default InfiniteScroll;
