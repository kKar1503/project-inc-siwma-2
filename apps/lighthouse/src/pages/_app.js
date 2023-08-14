import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  console.log('MyApp component rendered');
  return <Component {...pageProps} />;
}
