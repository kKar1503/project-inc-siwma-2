// TODO: TO be re-implemented with the new logic of share function
// import { GetServerSideProps, GetServerSidePropsContext } from 'next';
// import prismaClient from '@inc/db';
//
// const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//   const { query } = context;
//
//   const listing = await prismaClient.listing.findUnique({
//     where: {
//       hashedUrl: query.id as string,
//     },
//   });
//
//   if (listing === null) {
//     return {
//       notFound: true,
//     };
//   }
//
//   const listingName = listing.name.replace(/\s+/g, '-').toLowerCase();
//
//   return {
//     redirect: {
//       destination: `/listing/${listingName}-${listing.id}`,
//       permanent: true,
//     },
//   };
// };
//
// const SharePage = () => null;
//
// SharePage.includeNavbar = false;
//
// export { getServerSideProps };
// export default SharePage;

const Placeholder = () => <h1>Hello World</h1>;

export default Placeholder;
