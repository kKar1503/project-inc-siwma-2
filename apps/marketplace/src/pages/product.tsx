import Head from 'next/head';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';

// eslint-disable-next-line no-unused-vars

const Home = () => (
  <>
    <Head>
      <title>Product Listing Component</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <ProductListingItem
        img=""
        type="Buy"
        name="Potatoes Potatahtos"
        rating={4.6}
        href=""
        price={23.4}
        negotiable
        ownerId=""
        ownerFullName="Mr. Potato"
        createdAt="2022-10-05T14:48:00.000Z"
        companyName="Potato Industries"
        isUnitPrice={false}
        isOwnProfile
      />
    </main>
  </>
);

export default Home;
