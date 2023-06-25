import { useSession } from 'next-auth/react';

// AuthenticationGuard Props
export interface AuthenticationGuardProps {
  children: JSX.Element;
  loader?: JSX.Element;
  disallowAuthenticatedFallback: JSX.Element;
  disallowNonAuthenticatedFallback: JSX.Element;
  allowAuthenticated: boolean;
  allowNonAuthenticated: boolean;
}

/**
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const AuthenticationGuard = ({
  children,
  disallowAuthenticatedFallback,
  disallowNonAuthenticatedFallback,
  allowAuthenticated,
  allowNonAuthenticated,
}: AuthenticationGuardProps) =>
  // useUser() uses useSessionContext() internally and returns the user object
  // We want to ensure that the user object is derived from a single source (The context),
  // so if the useUser() hook were to change, there won't be any unexpected issues

  // TODO: Someone please work towards this.
  // const { status } = useSession();

  // if (allowAuthenticated && allowNonAuthenticated) {
  //   return children;
  // }

  // // If we don't allow authenticated users, and the user is authenticated, we return the fallback
  // if (!allowAuthenticated && status == "authenticated") {
  //   return disallowAuthenticatedFallback ?? null;
  // }

  // // If we don't allow non-authenticated users, and the user is not authenticated, we return the fallback
  // if (!allowNonAuthenticated && status == "unauthenticated") {
  //   return disallowNonAuthenticatedFallback ?? null;
  // }

  // All checks passed
  children;

export default AuthenticationGuard;
