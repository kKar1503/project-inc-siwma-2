import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import categoryListings from '@/middlewares/categoryListings';
import fetchCatById from '@/middlewares/fetchCatById';
import searchListings, { FilterOptions } from '@/middlewares/searchListings';
import { Listing } from '@/utils/api/client/zod/listings';
import fetchListings from '@/middlewares/fetchListingsWithCatId';
import { InfiniteScroll, useResponsiveness } from '@inc/ui';

const useFetchCatById = (id: string | string[] | undefined) => {
  const data = useQuery(['CatIdListing', id], async () => fetchCatById(id), {
    enabled: id !== undefined,
  });

  return data;
};

const IndividualCategoryPg = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isSm, isMd, isLg, isXl] = useResponsiveness(['sm', 'md', 'lg', 'xl']);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [listings, setListings] = useState<Array<Listing>>([]);
  const [lastListingId, setLastListingId] = useState<number>(9);
  const [maxItems, setMaxItems] = useState<boolean>(false);
  const scrollRef = useRef<Element>(null);

  const { isLoading, refetch } = useQuery(
    ['CatListings', filterOptions, id, lastListingId],
    async () => categoryListings(lastListingId, id, filterOptions),
    {
      enabled: id !== undefined,
      onSuccess: (data) => {
        const lastItem = data[data.length - 1];
        if (lastItem) {
          setLastListingId(parseInt(lastItem.id, 10));
        }

        if (data.length === 0) {
          setMaxItems(true);
        } else {
          setListings((prev) => [...prev, ...data]);
        }

        if (scrollRef.current && scrollRef.current.scrollHeight > window.screen.height) {
          scrollRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
      },
    }
  );

  useEffect(() => {
   setLastListingId(0)
   setListings([])
  }, [filterOptions]);

  // const { data: listingData, isLoading } = useCatListings(id, filterOptions);
  const { data: catData } = useFetchCatById(id);

  const Header: HeaderProps = {
    title: {
      single: catData ? `${catData.name} listing` : '',
      plural: catData ? `${catData.name} listings` : '',
    },
    noOfItems: listings ? listings.length : 0,
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

        {/* {listings && listings.length > 0 && ( */}
          <InfiniteScroll
            onLoadMore={refetch}
            loading={isLoading}
            reachedMaxItems={maxItems}
            loadingComponent={<CircularProgress />}
            parent={Grid}
            endMessage={
              <Typography variant="h6" textAlign="center" sx={{ marginTop: '2em' }}>
                No more listings available
              </Typography>
            }
            parentProps={{
              container: true,
              spacing: 2,
            }}
            child={Grid}
            childProps={{
              item: true,
              xl: 3,
              lg: 2.5,
              md: 3.5,
              sm: 5,
              xs: 12,
            }}
          >
            {listings.map((item: Listing) => (
              <ProductListingItem data={item} showBookmark />
            ))}
          </InfiniteScroll>
        {/* )} */}
      </DisplayResults>
    </Container>
  );
};

export default IndividualCategoryPg;
