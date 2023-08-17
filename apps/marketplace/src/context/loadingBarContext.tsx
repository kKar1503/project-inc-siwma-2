import { createContext, useContext, ReactNode } from 'react';
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

export const LoadingBarProvider: React.FC<Props> = ({ children, loadingBarRef }) => (
  <LoadingBarContext.Provider value={{ loadingBarRef }}>{children}</LoadingBarContext.Provider>
);
