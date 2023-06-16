import Head from 'next/head';
import { Button } from '@inc/ui';
import type { Person } from '@inc/types';
import { signIn, useSession } from 'next-auth/react';
// import AdminSideBar from '@/components/AdminSideBar';
import Box from '@mui/material/Box';

// eslint-disable-next-line no-unused-vars
const p: Person = {
  id: 5,
  name: 'string',
};

const CategoriesManagement = () => {
  const { data: session } = useSession();

  return (
    <Box sx={{ padding: '2em' }}>
      <Head>
        <title>Categories Management</title>
        <meta name="description" content="Categories Management Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button onClick={() => console.log('clicked')}>Hello</Button>
        <p>Categories Management Page</p>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </main>
    </Box>
  );
};

CategoriesManagement.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* <AdminSideBar /> */}
      <Box sx={{ flex: '1' }}>{page}</Box>
    </Box>
  );
};

export default CategoriesManagement;