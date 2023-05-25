import { Html, Head, Main, NextScript } from 'next/document';
import NavBar from '@/components/marketplace/navbar/NavBar';

const Document = () => (
  <Html lang="en">
    <Head />
    <body>
      <NavBar />
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
