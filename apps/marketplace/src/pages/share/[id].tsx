import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import prismaClient from '@inc/db';

const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;

  const listing = await prismaClient.listing.findUnique({
    where: {
      hashedUrl: query.id as string,
    },
  });

  if (listing === null) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: `/listing/${listing.id}`,
      permanent: true,
    },
  };
};

const SharePage = () => null;

SharePage.includeNavbar = false;

export { getServerSideProps };
export default SharePage;
