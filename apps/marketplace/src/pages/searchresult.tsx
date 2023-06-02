import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
// middleware
import fetchListings, { FilterOptions } from '@/middlewares/fetchListings';
import { Listing } from '../utils/api/client/zod/listings';

const useSearchListings = (matching: string, filter?: FilterOptions) => {
  const { data } = useQuery(['listings', filter], async () => fetchListings(matching, filter), {
    enabled: matching !== undefined,
  });

  return data;
};

const convertListing = (listing: Listing, uuid: string) => ({
  productId: Number(listing.id),
  img: listing.coverImage ? listing.coverImage : '',
  profileImg: listing.owner.profilePic ? listing.owner.profilePic : '',
  type: listing.type,
  name: listing.name,
  rating: listing.rating ? listing.rating : 0,
  price: listing.price,
  negotiable: listing.negotiable,
  ownerId: listing.owner.id,
  ownerFullName: listing.owner.name,
  createdAt: listing.createdAt,
  companyName: listing.owner.company.name,
  isUnitPrice: listing.unitPrice,
  isOwnProfile: listing.owner.id === uuid,
});

const convertToProductListingItems = (
  listings: Listing[] | undefined,
  uuid: string | undefined
) => {
  const temp: ProductListingItemProps[] = [];
  if (listings && uuid) {
    listings.forEach((listing) => {
      temp.push(convertListing(listing, uuid));
    });
  }

  return temp;
};

const Searchresult = () => {
  const router = useRouter();
  const { search } = router.query;
  const { data: session } = useSession();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  const listingData = useSearchListings(search as string, filterOptions);

  return (
    <DisplayResults
      filter
      data={convertToProductListingItems(listingData, session?.user.id)}
      setFilterOptions={setFilterOptions}
    >
      <>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h4"
            sx={({ typography, spacing }) => ({
              fontWeight: typography.fontWeightBold,
              mb: spacing(2),
            })}
          >
            Search Results
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5">
            Displaying {listingData ? listingData.length : 0} search results for:
          </Typography>
        </Grid>
      </>
    </DisplayResults>
  );
};

export default Searchresult;
