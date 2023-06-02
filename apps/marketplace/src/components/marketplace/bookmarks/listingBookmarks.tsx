import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DisplayResults from '@/layouts/DisplayResults';
import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import { Listing } from '@/utils/api/client/zod/listings';

// test data
const bookmarkData: ProductListingItemProps[] = [
  {
    productId: 1,
    img: '',
    profileImg: '',
    type: 'Buy',
    name: 'Metal 1',
    rating: 4.5,
    price: 1000,
    negotiable: true,
    ownerId: '1',
    ownerFullName: 'John Doe',
    createdAt: '2021-10-01T00:00:00.000Z',
    companyName: 'Apple',
    isUnitPrice: false,
    isOwnProfile: false,
  },
  {
    productId: 2,
    img: '',
    profileImg: '',
    type: 'Buy',
    name: 'Metal 2',
    rating: 4.5,
    price: 1000,
    negotiable: true,
    ownerId: '1',
    ownerFullName: 'John Doe',
    createdAt: '2021-10-01T00:00:00.000Z',
    companyName: 'Apple',
    isUnitPrice: false,
    isOwnProfile: false,
  },
  {
    productId: 3,
    img: '',
    profileImg: '',
    type: 'Buy',
    name: 'Metal 3',
    rating: 4.5,
    price: 1000,
    negotiable: true,
    ownerId: '1',
    ownerFullName: 'John Doe',
    createdAt: '2021-10-01T00:00:00.000Z',
    companyName: 'Apple',
    isUnitPrice: false,
    isOwnProfile: false,
  },
  {
    productId: 4,
    img: '',
    profileImg: '',
    type: 'Buy',
    name: 'Metal 3',
    rating: 4.5,
    price: 1000,
    negotiable: true,
    ownerId: '1',
    ownerFullName: 'John Doe',
    createdAt: '2021-10-01T00:00:00.000Z',
    companyName: 'Apple',
    isUnitPrice: false,
    isOwnProfile: false,
  },
];

export const getServerSideProps = async () => {
  const data: ProductListingItemProps[] = bookmarkData;

  return {
    props: {
      data,
    },
  };
};

const ListingBookmarks = ({ data }: { data: Listing[] }) => (
  <DisplayResults filter={false} data={bookmarkData}>
    {data && data.length > 0 && (
      <Grid container display="flex" spacing={1}>
        {data.map((item: Listing) => (
          <Grid item sm={3} md={4} key={item.id}>
            <Typography>{item.name}</Typography>
          </Grid>
        ))}
      </Grid>
    )}
  </DisplayResults>
);

export default ListingBookmarks;
