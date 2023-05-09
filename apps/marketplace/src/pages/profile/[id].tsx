import Head from 'next/head';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import ProfileDetailCard, {
  ProfileDetailCardProps,
} from '@/components/marketplace/profile/ProfileDetailCard';
import { useRouter } from 'next/router';

// eslint-disable-next-line no-unused-vars

// test data for profile component
const profileDetailData = [
  {
    username: 'diggers',
    name: 'John Tan',
    email: 'digs@gmail.com',
    company: 'Prof. Digging Ltd.',
    profilePic: 'J',
    mobileNumber: '2314 5324',
    telegramUsername: '@digpeople',
    bio: 'Introducing Professional Digging Limited, a leading mining company with a proven track record of excellence in the industry. With decades of experience in the mining business, we have established ourselves as a trusted and reliable provider of high-quality minerals and metals.',
    rating: 3.4,
    reviews: 336,
  },
  {
    username: 'rock_hound',
    name: 'Emily Stone',
    email: 'emily.stone@gmail.com',
    company: 'Stone Exploration Co.',
    profilePic: 'E',
    mobileNumber: '4590 2379',
    telegramUsername: '@stone_explorer',
    bio: 'At Stone Exploration Co., we specialize in the exploration and development of new mineral resources. Our team of experts uses cutting-edge technology to identify promising mineral deposits and assess their potential for commercial mining. We are dedicated to responsible mining practices that prioritize the safety of our workers and the protection of the environment.',
    rating: 4.6,
    reviews: 97,
  },
  {
    username: 'ore_king',
    name: 'David Hill',
    email: 'david.hill@orekingdom.com',
    company: 'Ore Kingdom Inc.',
    profilePic: 'D',
    mobileNumber: '9031 2150',
    telegramUsername: '@ore_kingdom',
    bio: 'Ore Kingdom Inc. is a leading provider of iron ore and other minerals to markets around the world. We have extensive experience in mining and processing high-quality ores and are committed to sustainable and responsible practices. Our team is dedicated to delivering the best possible products and services to our customers.',
    rating: 4.8,
    reviews: 215,
  },
  {
    username: 'gold_digger',
    name: 'Sarah Jones',
    email: 'sjones@golddigger.com',
    company: 'Gold Digger Mining Corp.',
    profilePic: 'S',
    mobileNumber: '5678 1234',
    telegramUsername: '@gold_digger',
    bio: 'Gold Digger Mining Corp. is a trusted provider of gold and other precious metals. Our team of experts has decades of experience in mining and processing high-quality ores, and we are committed to responsible practices that prioritize safety, sustainability, and environmental protection. We strive to exceed the expectations of our customers and provide them with the best possible products and services.',
    rating: 4.3,
    reviews: 184,
  },
  {
    username: 'mining_pro',
    name: 'Jackie Lee',
    email: 'jackie.lee@miningpro.com',
    company: 'Mining Pro Solutions',
    profilePic: 'J',
    mobileNumber: '7777 9999',
    telegramUsername: '@mining_pro',
    bio: 'Mining Pro Solutions provides cutting-edge solutions for the mining industry. Our team of experienced professionals specializes in the design, engineering, and implementation of advanced mining equipment and technologies that improve efficiency, safety, and productivity. We are committed to delivering the best possible solutions to our clients and helping them achieve their goals.',
    rating: 4.9,
    reviews: 102,
  },
  {
    username: 'ore_genius',
    name: 'Karen Chen',
    email: 'karen.chen@oregenius.com',
    company: 'Ore Genius Inc.',
    profilePic: 'K',
    mobileNumber: '1234 5678',
    telegramUsername: '@ore_genius',
    bio: 'Ore Genius Inc. is a cutting-edge provider of mineral exploration and analysis services. Our team of experts uses the latest technology to identify and assess mineral deposits, helping our clients make informed decisions about their mining operations. We are committed to delivering high-quality services that exceed our clients expectations and contribute to sustainable and responsible mining practices.',
    rating: 4.5,
    reviews: 76,
  },
];

export const getServerSideProps = async ({ query }: { query: any }) => {
  // api call to get user details go here
  // if user does not exist, return error code and redirect to wherever appropriate

  const { id } = query;
  if (!Number.isInteger(parseFloat(id))) {
    // Redirect to the index page
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  // just for testing purposes
  if (id > profileDetailData.length) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const data = profileDetailData[id - 1];

  return {
    props: {
      data,
    },
  };
};

const ProfilePage = ({ data }: { data: ProfileDetailCardProps }) => {
  console.log(data);

  return (
    <>
      <Head>
        <title>Product Listing Component</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ProductListingItem
          img="data:image/jpeg;base64,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"
          profileImg="data:image/jpeg;base64,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"
          type="Sell"
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
        <ProfileDetailCard
          username={data.username}
          name={data.name}
          company={data.company}
          email={data.email}
          profilePic={data.profilePic}
          telegramUsername={data.telegramUsername}
          bio={data.bio}
          mobileNumber={data.mobileNumber}
          rating={data.rating}
          reviews={data.reviews}
        />
      </main>
    </>
  );
};

export default ProfilePage;
