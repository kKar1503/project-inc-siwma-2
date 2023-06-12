import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
// middleware
import searchListings, { FilterOptions } from '@/middlewares/searchListings';
import { Listing } from '@/utils/api/client/zod/listings';
import { Box, Container } from '@mui/material';

const useSearchListings = (matching: string, filter?: FilterOptions) => {
  const data = useQuery(
    ['listings', filter, matching],
    async () => searchListings(matching, filter),
    {
      enabled: matching !== undefined,
    }
  );

  return data;
};

const convertListing = (listing: Listing, uuid: string | undefined) => ({
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

const Searchresult = () => {
  const router = useRouter();
  const { search } = router.query;
  const { data: session } = useSession();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  const { data: listingData, isLoading } = useSearchListings(search as string, filterOptions);

  const Header: HeaderProps = {
    title: {
      single: `Displaying search result for: "${search}"`,
      plural: `Displaying search results for: "${search}"`,
    },
    noOfItems: listingData ? listingData.length : 0,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <DisplayResults filter data={Header} setFilterOptions={setFilterOptions} subHeader={false}>
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Image src="/images/loading.gif" alt="Loading" width={150} height={150} />
          </Box>
        )}
        {listingData && listingData.length > 0 && (
          <Grid container display="flex" spacing={2}>
            {listingData.map((item: Listing) => (
              <Grid item xs={6} md={4} xl={3} key={item.id}>
                <ProductListingItem data={convertListing(item, session?.user.id)} />
              </Grid>
            ))}
          </Grid>
        )}
      </DisplayResults>
    </Container>
  );
};

export default Searchresult;
