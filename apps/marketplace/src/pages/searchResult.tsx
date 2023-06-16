import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
// middleware
import searchListings, { FilterOptions } from '@/middlewares/searchListings';
import { Listing } from '@/utils/api/client/zod/listings';
import { Box, CircularProgress, Container } from '@mui/material';

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

const Searchresult = () => {
  const router = useRouter();
  const { search } = router.query;
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
      <DisplayResults
        filter
        data={Header}
        setFilterOptions={setFilterOptions}
        subHeader={false}
        isLoading={isLoading}
      >
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {listingData && listingData.length > 0 && (
          <Grid container display="flex" spacing={2}>
            {listingData.map((item: Listing) => (
              <Grid item xs={6} md={4} xl={3} key={item.id}>
                <ProductListingItem data={item} showBookmark />
              </Grid>
            ))}
          </Grid>
        )}
      </DisplayResults>
    </Container>
  );
};

export default Searchresult;
