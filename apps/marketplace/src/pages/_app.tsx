import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo } from 'react';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';
import AuthenticationGuard from '@/components/auth/AuthenticationGuard';
import { ThemeComponent, useResponsiveness } from '@inc/ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider, MaterialDesignContent, SnackbarOrigin } from 'notistack';
import { styled } from '@mui/material';
import CloseButton from '@/components/marketplace/notification/CloseButton';

// -- Type declarations --//
// Page type
interface PageType extends React.FunctionComponent<any> {
  getLayout: (page: JSX.Element) => JSX.Element;
  allowAuthenticated: boolean;
  allowNonAuthenticated: boolean;
  auth?: boolean;
}

// App prop type
type ExtendedAppProps = AppProps & {
  // Override the component type
  Component: PageType;
  pageProps: {
    session: Session | null;
  };
};

// Redirect the user to the login page if the user is not authenticated (but the page requires them to be)
const DisallowNonAuthenticatedFallback = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/login?redirect=${router.asPath}`);
  }, [router]);
  return <SpinnerPage />;
};

// Redirect the user to the track page if the user is authenticated
const DisallowAuthenticatedFallback = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/`);
  }, [router]);
  return <SpinnerPage />;
};

// Change default notistack background color
const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: 'white',
    padding: '0px',
    alignItems: 'center',
    border: '1px solid blue',
  },
}));

const App = ({ Component, pageProps: { session, ...pageProps } }: ExtendedAppProps) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const queryClient = new QueryClient();
  const { allowAuthenticated, allowNonAuthenticated } = Component;
  // Snackbar close button
  const CloseAlert = useCallback((key: unknown) => <CloseButton id={key} />, []);
  // Stying snackbar responsiveness
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const alertStyle: SnackbarOrigin | undefined = useMemo(() => {
    if (isSm) {
      return { vertical: 'top', horizontal: 'center' };
    }
    if (isMd) {
      return { vertical: 'bottom', horizontal: 'right' };
    }
    if (isLg) {
      return { vertical: 'bottom', horizontal: 'right' };
    }
    return undefined;
  }, [isSm, isMd, isLg]);

  return (
    <ThemeComponent>
      <SessionProvider session={session}>
        <AuthenticationGuard
          disallowAuthenticatedFallback={<DisallowAuthenticatedFallback />}
          disallowNonAuthenticatedFallback={<DisallowNonAuthenticatedFallback />}
          allowAuthenticated={allowAuthenticated}
          allowNonAuthenticated={allowNonAuthenticated}
        >
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider
              maxSnack={3}
              action={CloseAlert}
              anchorOrigin={alertStyle}
              Components={{
                default: StyledMaterialDesignContent,
              }}
            >
              {getLayout(<Component {...pageProps} />)}
            </SnackbarProvider>
          </QueryClientProvider>
        </AuthenticationGuard>
      </SessionProvider>
    </ThemeComponent>
  );
};

export default App;
