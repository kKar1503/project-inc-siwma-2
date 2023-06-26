import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import categoryListings from '@/middlewares/categoryListings';
import fetchCatById from '@/middlewares/fetchCatById';
import { FilterOptions } from '@/middlewares/searchListings';
import { Listing } from '@/utils/api/client/zod/listings';
import { InfiniteScroll } from '@inc/ui';

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
        setLastListingId(lastListingId + data.length);

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
    setLastListingId(0);
    setListings([]);
  }, [filterOptions]);

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
            md: 4,
            xs: 6,
          }}
        >
          {listings.map((item: Listing) => (
            <ProductListingItem data={item} showBookmark />
          ))}
        </InfiniteScroll>
      </DisplayResults>
    </Container>
  );
};

export default IndividualCategoryPg;
