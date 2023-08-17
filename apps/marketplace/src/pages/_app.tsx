/* eslint-disable react/no-unknown-property */
/* eslint-disable camelcase */
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';
import AuthenticationGuard from '@/components/auth/AuthenticationGuard';
import { ThemeComponent, useResponsiveness } from '@inc/ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from '@/components/marketplace/navbar/NavBar';
import Box from '@mui/material/Box';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/i18n';
import { MaterialDesignContent, SnackbarOrigin, SnackbarProvider } from 'notistack';
import { styled } from '@mui/material';
import { Noto_Sans_SC } from 'next/font/google';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

// -- Type declarations --//
// Page type
interface PageType extends React.FunctionComponent<any> {
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
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ThemeComponent fonts={notoSansSC.style.fontFamily}>
        <SessionProvider session={session}>
          <AuthenticationGuard
            disallowAuthenticatedFallback={<DisallowAuthenticatedFallback />}
            disallowNonAuthenticatedFallback={<DisallowNonAuthenticatedFallback />}
            loader={<SpinnerPage />}
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
      </ThemeComponent>
    </LocalizationProvider>
  );
};

export default App;
