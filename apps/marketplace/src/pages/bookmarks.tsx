import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import { ListingResponse } from '@api/v1/listings/index';
import DisplayResults from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// test data
const bookmarkData: ProductListingItemProps[] = [
  {
    img: '',
    type: 'Buy',
    href: '',
    price: 69,
    name: 'idk1',
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
    name: 'idk2',
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
    name: 'idk3',
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
    name: 'idk4',
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
    name: 'idk5',
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
    name: 'idk6',
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
  <DisplayResults filter={false} data={data}>
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
          <Typography variant="h5">{data.length} Listings</Typography>
        </Grid>
      </>
    ) : (
      <Typography variant="h5">Displaying 0 search results for: </Typography>
    )}
  </DisplayResults>
);

export default Bookmarks;
