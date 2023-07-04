import Grid from '@mui/material/Grid';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import { Listing } from '@/utils/api/client/zod/listings';
import { useTranslation } from 'react-i18next';

export type ListingBookmarksProps = {
  data: Listing[];
  updateBookmarkData: () => void;
};

const ListingBookmarks = ({ data, updateBookmarkData }: ListingBookmarksProps) => {
  const { t } = useTranslation();

  const Header: HeaderProps = {
    title: {
      single: t('Listing'),
      plural: t('Listings'),
    },
    noOfItems: data ? data.length : 0,
  };

  return (
    <DisplayResults filter={false} data={Header} subHeader>
      {data && data.length > 0 && (
        <Grid container display="flex" spacing={1}>
          {data.map((item: Listing) => (
            <Grid item xs={6} md={4} lg={3} key={item.id}>
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
