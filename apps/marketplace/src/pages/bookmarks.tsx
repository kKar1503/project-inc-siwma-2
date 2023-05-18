import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults from '@/layouts/DisplayResults';

// test data
const bookmarkData: ProductListingItemProps[] = [
  {
    img: '',
    type: 'Buy',
    href: '',
    price: 69,
    name: 'idk',
    rating: 3,
    negotiable: true,
    ownerFullName: 'Jack AinsField',
    ownerId: 'supgirl',
    companyName: 'Apple',
    isUnitPrice: true,
    createdAt: '2021-10-10',
  },
  {
    img: '',
    type: 'Buy',
    href: '',
    price: 69,
    name: 'idk',
    rating: 3,
    negotiable: true,
    ownerFullName: 'Jack AinsField',
    ownerId: 'supgirl',
    companyName: 'Apple',
    isUnitPrice: true,
    createdAt: '2021-10-10',
  },
  {
    img: '',
    type: 'Buy',
    href: '',
    price: 69,
    name: 'idk',
    rating: 3,
    negotiable: true,
    ownerFullName: 'Jack AinsField',
    ownerId: 'supgirl',
    companyName: 'Apple',
    isUnitPrice: true,
    createdAt: '2021-10-10',
  },
  {
    img: '',
    type: 'Buy',
    href: '',
    price: 69,
    name: 'idk',
    rating: 3,
    negotiable: true,
    ownerFullName: 'Jack AinsField',
    ownerId: 'supgirl',
    companyName: 'Apple',
    isUnitPrice: true,
    createdAt: '2021-10-10',
  },
  {
    img: '',
    type: 'Buy',
    href: '',
    price: 69,
    name: 'idk',
    rating: 3,
    negotiable: true,
    ownerFullName: 'Jack AinsField',
    ownerId: 'supgirl',
    companyName: 'Apple',
    isUnitPrice: true,
    createdAt: '2021-10-10',
  },
  {
    img: '',
    type: 'Buy',
    href: '',
    price: 69,
    name: 'idk',
    rating: 3,
    negotiable: true,
    ownerFullName: 'Jack AinsField',
    ownerId: 'supgirl',
    companyName: 'Apple',
    isUnitPrice: true,
    createdAt: '2021-10-10',
  },
];

const title = 'Bookmarks';

export const getServerSideProps = async () => {
  const data: ProductListingItemProps[] = bookmarkData;

  return {
    props: {
      data,
    },
  };
};

const Bookmarks = ({ data }: { data: ProductListingItemProps[] }) => (
  <DisplayResults filter={false} data={data} title={title} />
);

export default Bookmarks;
