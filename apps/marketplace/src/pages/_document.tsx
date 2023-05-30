import { Html, Head, Main, NextScript } from 'next/document';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const Document = () => {
  const { spacing, shape, shadows, palette, typography } = useTheme();
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
