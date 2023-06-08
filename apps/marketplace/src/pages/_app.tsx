import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';
import AuthenticationGuard from '@/components/auth/AuthenticationGuard';
import { ThemeComponent } from '@inc/ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from '@/components/marketplace/navbar/NavBar';
import Box from '@mui/material/Box';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/i18n';

// -- Type declarations --//
// Page type
interface PageType extends React.FunctionComponent<any> {
  getLayout: (page: JSX.Element) => JSX.Element;
  allowAuthenticated: boolean;
  allowNonAuthenticated: boolean;
  auth?: boolean;
  includeNavbar?: boolean;
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

const App = ({ Component, pageProps: { session, ...pageProps } }: ExtendedAppProps) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const queryClient = new QueryClient();
  const { allowAuthenticated, allowNonAuthenticated, includeNavbar = true } = Component;

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
            {getLayout(
              <Box>
                <I18nextProvider i18n={i18n}>
                  {includeNavbar && <NavBar />}
                  <Component {...pageProps} />
                </I18nextProvider>
              </Box>
            )}
          </QueryClientProvider>
        </AuthenticationGuard>
      </SessionProvider>
    </ThemeComponent>
  );
};

export default App;
