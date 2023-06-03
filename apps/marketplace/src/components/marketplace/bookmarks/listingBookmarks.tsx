import Grid from '@mui/material/Grid';
import DisplayResults from '@/layouts/DisplayResults';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import { Listing } from '@/utils/api/client/zod/listings';

export type ListingBookmarksProps = {
  data: Listing[];
  updateBookmarkData: () => void;
};

const title = { single: 'Listing', plural: 'Listings' };

const ListingBookmarks = ({ data, updateBookmarkData }: ListingBookmarksProps) => (
  <DisplayResults filter={false} data={{ title, noOfItems: data.length }}>
    {data && data.length > 0 && (
      <Grid container display="flex" spacing={1}>
        {data.map((item: Listing) => (
          <Grid item sm={3} md={4} key={item.id}>
            <ProductListingItem data={item} updateBookmarkData={updateBookmarkData} />
          </Grid>
        ))}
      </Grid>
    )}
  </DisplayResults>
);

export default ListingBookmarks;
