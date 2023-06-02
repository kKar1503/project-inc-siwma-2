import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DisplayResults from '@/layouts/DisplayResults';
import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import listings, { ListingResponseBody } from '@/utils/api/client/zod/listings';

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

const ListingBookmarks = () => (
  <DisplayResults filter={false} data={bookmarkData}>
    {bookmarkData ? (
      <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
        <Typography sx={{ fontWeight: 500 }} variant="h3">
          Listing Bookmarks
        </Typography>
        <Typography variant="h5">{bookmarkData.length} Listings</Typography>
      </Grid>
    ) : (
      <Typography variant="h5">Displaying 0 search results for: </Typography>
    )}
  </DisplayResults>
);

export default ListingBookmarks;
