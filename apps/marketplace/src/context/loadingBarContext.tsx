import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { LoadingBarRef } from 'react-top-loading-bar';

interface LoadingBarContextType {
  loadingBarRef: React.RefObject<LoadingBarRef>;
}

const LoadingBarContext = createContext<LoadingBarContextType | undefined>(undefined);

export const useLoadingBar = () => {
  const context = useContext(LoadingBarContext);
  if (!context) {
    throw new Error('useLoadingBar must be used within a LoadingBarProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
  loadingBarRef: React.RefObject<LoadingBarRef>;
}

export const LoadingBarProvider: React.FC<Props> = ({ children, loadingBarRef }) => {
  // Use useMemo to prevent the context value from changing on every render
  const contextValue = useMemo(() => ({ loadingBarRef }), [loadingBarRef]);

  return <LoadingBarContext.Provider value={contextValue}>{children}</LoadingBarContext.Provider>;
};