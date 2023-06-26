import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { InfiniteScroll } from '@inc/ui';
// middleware
import searchListings, { FilterOptions } from '@/middlewares/searchListings';
import { Listing } from '@/utils/api/client/zod/listings';
import { CircularProgress, Container, Typography } from '@mui/material';

function getLargestId(data: Listing[]) {
  const ids = data.map((listing) => parseInt(listing.id, 10));
  return Math.max(...ids).toString();
}

const Searchresult = () => {
  const router = useRouter();
  const { search } = router.query;
  const scrollRef = useRef<Element>(null);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [listings, setListings] = useState<Array<Listing>>([]);
  const [lastListingId, setLastListingId] = useState<number>(0);
  const [maxItems, setMaxItems] = useState<boolean>(false);

  const { isLoading, refetch } = useQuery(
    ['listings', search, filterOptions, lastListingId],
    async () => searchListings(search as string, lastListingId, filterOptions),
    {
      enabled: search !== undefined,
      onSuccess: (data) => {
        const largestId = getLargestId(data);
        const lastItem = data.find((data) => data.id === largestId);
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
    setLastListingId(0);
    setListings([]);
  }, [filterOptions]);

  const Header: HeaderProps = {
    title: {
      single: `Displaying search result for: "${search}"`,
      plural: `Displaying search results for: "${search}"`,
    },
    noOfItems: listings.length,
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
        <InfiniteScroll
          onLoadMore={refetch}
          loading={isLoading}
          reachedMaxItems={maxItems}
          loadingComponent={<CircularProgress />}
          parent={Grid}
          endMessage={
            <Typography variant="h6" textAlign="center" sx={{ my: '2em' }}>
              No more listings available
            </Typography>
          }
          parentProps={{
            container: true,
            display: 'flex',
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
          {listings?.map((item) => (
            <ProductListingItem data={item} key={item.id} />
          ))}
        </InfiniteScroll>
      </DisplayResults>
    </Container>
  );
};

export default Searchresult;
