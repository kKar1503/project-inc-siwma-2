import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress, Container } from '@mui/material';
import categoryListings from '@/middlewares/categoryListings';
import fetchCatById from '@/middlewares/fetchCatById';
import searchListings, { FilterOptions } from '@/middlewares/searchListings';
import { Listing } from '@/utils/api/client/zod/listings';
import fetchListings from '@/middlewares/fetchListingsWithCatId';
import { InfiniteScroll } from '@inc/ui';

const useCatListings = (id: string | string[] | undefined, filter?: FilterOptions) => {
  const data = useQuery(['CatListings', filter, id], async () => categoryListings(id, filter), {
    enabled: id !== undefined,
  });

  return data;
};

const useFetchCatById = (id: string | string[] | undefined) => {
  const data = useQuery(['CatIdListing', id], async () => fetchCatById(id), {
    enabled: id !== undefined,
  });

  return data;
};

const IndividualCategoryPg = () => {
  const router = useRouter();
  const { id } = router.query;
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  const { data: listingData, isLoading } = useCatListings(id, filterOptions);
  const { data: catData } = useFetchCatById(id);

  const Header: HeaderProps = {
    title: {
      single: `Displaying ${catData?.name} listing`,
      plural: `Displaying ${catData?.name} listings`,
    },
    noOfItems: listingData ? listingData.length : 0,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <DisplayResults
        forCategory
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

export default IndividualCategoryPg;
