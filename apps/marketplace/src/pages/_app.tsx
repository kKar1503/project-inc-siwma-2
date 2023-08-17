/* eslint-disable react/no-unknown-property */
/* eslint-disable camelcase */
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useRouter, Router } from 'next/router';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { LoadingBarProvider } from '@/context/loadingBarContext';
import React, { useEffect, useMemo } from 'react';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';
import AuthenticationGuard from '@/components/auth/AuthenticationGuard';
import { ThemeComponent, useResponsiveness } from '@inc/ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from '@/components/marketplace/navbar/NavBar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/i18n';
import { MaterialDesignContent, SnackbarOrigin, SnackbarProvider } from 'notistack';
import { styled } from '@mui/material';
import { Noto_Sans_SC } from 'next/font/google';

// -- Type declarations --//
// Page type
interface PageType extends React.FunctionComponent<unknown> {
  getLayout: (page: JSX.Element) => JSX.Element;
  allowAuthenticated: boolean;
  allowNonAuthenticated: boolean;
  auth?: boolean;
  includeNavbar?: boolean;
  renderSearchBar?: boolean;
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
    // Check if there is a redirect parameter in the router's query object
    const redirect = router.query.redirect as string;

    // If it exists, redirect the user to that URL
    if (redirect) {
      router.push(redirect);
      return;
    }

    // It does not, so redirect the user to the root page
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
  },
}));

// china font
const notoSansSC = Noto_Sans_SC({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const App = ({ Component, pageProps: { session, ...pageProps } }: ExtendedAppProps) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const queryClient = new QueryClient();
  const ref = React.useRef<LoadingBarRef | null>(null);
  const [isExternalNavigation, setIsExternalNavigation] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const router = useRouter();
  const { palette } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { referrer } = window.document;
      const isExternal = !referrer || !referrer.includes(window.location.hostname);
      setIsExternalNavigation(isExternal);
      if (isExternal) {
        setShowSpinner(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showSpinner) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [showSpinner]);

  useEffect(() => {
    const startLoading = () => {
      setTimeout(() => {
        if (isExternalNavigation) {
          setShowSpinner(true);
          return;
        }
        ref.current?.continuousStart();
      }, 1000);
    };

    const finishLoading = () => {
      setIsExternalNavigation(false);
      setShowSpinner(false);
      ref.current?.complete();
    };

    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', finishLoading);
    Router.events.on('routeChangeError', finishLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', finishLoading);
      Router.events.off('routeChangeError', finishLoading);
    };
  }, [isExternalNavigation, router.asPath, router.route]);

  const {
    allowAuthenticated = true,
    allowNonAuthenticated,
    includeNavbar = true,
    renderSearchBar,
  } = Component;
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
    <ThemeComponent fonts={notoSansSC.style.fontFamily}>
      <LoadingBar color={palette.primary.main} ref={ref} style={{ zIndex: 9999 }} />
      <LoadingBarProvider loadingBarRef={ref}>
        <SessionProvider session={session}>
          <AuthenticationGuard
            disallowAuthenticatedFallback={<DisallowAuthenticatedFallback />}
            disallowNonAuthenticatedFallback={<DisallowNonAuthenticatedFallback />}
            loader={showSpinner ? <SpinnerPage /> : <div />}
            allowAuthenticated={allowAuthenticated}
            allowNonAuthenticated={allowNonAuthenticated}
          >
            <QueryClientProvider client={queryClient}>
              <SnackbarProvider
                style={{ width: '100%', height: '0%' }}
                maxSnack={3}
                anchorOrigin={alertStyle}
                Components={{
                  default: StyledMaterialDesignContent,
                }}
              >
                {getLayout(
                  <Box height="100dvh" display="flex" flexDirection="column">
                    <I18nextProvider i18n={i18n}>
                      {includeNavbar && <NavBar renderSearchBar={renderSearchBar} />}
                      <Component {...pageProps} />
                    </I18nextProvider>
                  </Box>
                )}
              </SnackbarProvider>
            </QueryClientProvider>
          </AuthenticationGuard>
        </SessionProvider>
      </LoadingBarProvider>
    </ThemeComponent>
  );
};

export default App;
