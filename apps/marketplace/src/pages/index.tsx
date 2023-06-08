import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@inc/ui';
import type { Person } from '@inc/types';
import NavBar from '@/components/marketplace/navbar/NavBar';
import { signIn, useSession } from 'next-auth/react';

// eslint-disable-next-line no-unused-vars
const p: Person = {
  id: 5,
  name: 'string',
};

const Home = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button onClick={() => console.log('clicked')}>Hello</Button>
        <Link href="/marketplace">marketplace</Link>
        <p>Hello World</p>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </main>
    </>
  );
};

// Home.includeNavbar = false;

export default Home;
