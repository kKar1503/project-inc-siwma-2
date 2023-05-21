import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';
import AuthenticationGuard from '@/components/auth/AuthenticationGuard';
import { ThemeComponent } from '@inc/ui';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
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

// Change default notistack background color
const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: '#FFF',
    paddingRight: '30px'
  },
}));

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
  const { allowAuthenticated, allowNonAuthenticated } = Component;
  const CloseAlert =useCallback((key: any) => <CloseButton id={key} />, [])

  return (
    <ThemeComponent>
      <SnackbarProvider
        maxSnack={3}
        action={CloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        Components={{
          default: StyledMaterialDesignContent,
        }}
      >
        <SessionProvider session={session}>
          <AuthenticationGuard
            disallowAuthenticatedFallback={<DisallowAuthenticatedFallback />}
            disallowNonAuthenticatedFallback={<DisallowNonAuthenticatedFallback />}
            allowAuthenticated={allowAuthenticated}
            allowNonAuthenticated={allowNonAuthenticated}
          >
            {getLayout(<Component {...pageProps} />)}
          </AuthenticationGuard>
        </SessionProvider>
      </SnackbarProvider>
    </ThemeComponent>
  );
};

export default App;
