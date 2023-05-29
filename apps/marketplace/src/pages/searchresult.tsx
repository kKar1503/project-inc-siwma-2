import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// test data
const bookmarkData: ProductListingItemProps[] = [
  {
    productId: 1,
    img: '',
    profileImg: '',
    type: 'Sell',
    name: 'Metal 1',
    rating: 1,
    price: 1000,
    negotiable: true,
    ownerId: '1',
    ownerFullName: 'metal3',
    createdAt: '2021-10-01T00:00:00.000Z',
    companyName: 'metals',
    isUnitPrice: false,
    isOwnProfile: false,
  },
  {
    productId: 2,
    img: '',
    profileImg: '',
    type: 'Buy',
    name: 'Metal 2',
    rating: 3,
    price: 1200,
    negotiable: true,
    ownerId: '1',
    ownerFullName: 'metal2',
    createdAt: '2021-10-01T00:00:00.000Z',
    companyName: 'metals',
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
    price: 1369,
    negotiable: false,
    ownerId: '1',
    ownerFullName: 'metal1',
    createdAt: '2021-10-01T00:00:00.000Z',
    companyName: 'metals',
    isUnitPrice: false,
    isOwnProfile: false,
  },
];

const title = '';

export const getServerSideProps = async () => {
  const data: ProductListingItemProps[] = bookmarkData;

  return {
    props: {
      data,
    },
  };
};

const Searchresult = ({ data }: { data: ProductListingItemProps[] }) => (
  <DisplayResults filter data={data}>
    {data ? (
      <>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h4"
            sx={({ typography, spacing }) => ({
              fontWeight: typography.fontWeightBold,
              mb: spacing(2),
            })}
          >
            {title || 'Search Results'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5">Displaying {data.length} search results for:</Typography> 
        </Grid>
      </>
    ) : (
      <Typography variant="h5">Displaying 0 search results for: </Typography>
    )}
  </DisplayResults>
);

export default Searchresult;
