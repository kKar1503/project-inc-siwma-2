import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const NoInternetConnection = (props: any) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);
  const router = useRouter();

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener('online', () => {
    setOnline(true);
  });

  window.addEventListener('offline', () => {
    setOnline(false);
  });

    // if user is online, return the child component else return a custom component
    if (!isOnline) {
        router.replace('/503');
    }
  return (props.children);
};

export default NoInternetConnection;
