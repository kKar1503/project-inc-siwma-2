import Grid from '@mui/material/Grid';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import { Listing } from '@/utils/api/client/zod/listings';

export type ListingBookmarksProps = {
  data: Listing[];
  updateBookmarkData: () => void;
};

const ListingBookmarks = ({ data, updateBookmarkData }: ListingBookmarksProps) => {
  const Header: HeaderProps = {
    title: {
      single: 'Listing',
      plural: 'Listings',
    },
    noOfItems: data ? data.length : 0,
  };

  return (
    <DisplayResults filter={false} data={Header} subHeader>
      {data && data.length > 0 && (
        <Grid container display="flex" spacing={1}>
          {data.map((item: Listing) => (
            <Grid item xs={12} md={4} lg={3} key={item.id}>
              <ProductListingItem
                showBookmark
                data={item}
                updateBookmarkData={updateBookmarkData}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </DisplayResults>
  );
};

export default ListingBookmarks;
