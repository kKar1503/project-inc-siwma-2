import Grid from '@mui/material/Grid';
import DisplayResults from '@/layouts/DisplayResults';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import { Listing } from '@/utils/api/client/zod/listings';

const ListingBookmarks = ({ data }: { data: Listing[] }) => (
  <DisplayResults filter={false} data={{ title: 'Listing', noOfItems: data.length }}>
    {data && data.length > 0 && (
      <Grid container display="flex" spacing={1}>
        {data.map((item: Listing) => (
          <Grid item sm={3} md={4} key={item.id}>
            <ProductListingItem data={item} />
          </Grid>
        ))}
      </Grid>
    )}
  </DisplayResults>
);

export default ListingBookmarks;
