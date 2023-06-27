import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { InfiniteScroll } from '@inc/ui';
// middleware
import searchListings, { FilterOptions, SortingOptions } from '@/middlewares/searchListings';
import { Listing } from '@/utils/api/client/zod/listings';
import { CircularProgress, Container, Typography } from '@mui/material';
import { ParsedUrlQuery } from 'querystring';

const stringToBoolean = (stringValue: string | string[] | undefined) => {
  if (stringValue === 'true') {
    return true;
  }
  if (stringValue === 'false') {
    return false;
  }
  return undefined;
};

const Searchresult = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { search } = router.query;
  const scrollRef = useRef<Element>(null);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>();
  const [listings, setListings] = useState<Array<Listing>>([]);
  const [lastListingId, setLastListingId] = useState<number>(0);
  const [maxItems, setMaxItems] = useState<boolean>(false);
  const [listingCount, setListingCount] = useState<number>(0);

  const { isLoading, refetch } = useQuery(
    ['listings', search, filterOptions, lastListingId],
    async () => searchListings(search as string, lastListingId, filterOptions),
    {
      enabled: search !== undefined && (search as string).trim() !== '',
      cacheTime: 0,
      onSuccess: (data) => {
        setListingCount(data.count);
        setLastListingId(lastListingId + data.data.length);

        if (data.data.length === 0) {
          setMaxItems(true);
        } else {
          setListings((prev) => [...prev, ...data.data]);
        }

        if (scrollRef.current && scrollRef.current.scrollHeight > window.screen.height) {
          scrollRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
      },
    }
  );

  useEffect(() => {
    // Parse filter optins from the query
    const options: FilterOptions = {
      sortBy: (query.sortBy as SortingOptions) || 'recent_newest',
      category: parseInt(query.category as string, 10) || 0,
      negotiable: stringToBoolean(query.negotiable),
      minPrice: parseInt(query.minPrice as string, 10) || undefined,
      maxPrice: parseInt(query.maxPrice as string, 10) || undefined,
    };

    // Clear states
    setLastListingId(0);
    setListingCount(0);
    setListings([]);
    setMaxItems(false);

    // Update the filter options state
    setFilterOptions(options);
  }, [query]);

  const updateFilterOptions = (newFilterOptions: FilterOptions) => {
    // Update the router
    if (newFilterOptions) {
      const updatedQuery = {
        ...query,
        search,
        sortBy: newFilterOptions.sortBy,
        category: newFilterOptions.category,
        negotiable: newFilterOptions.negotiable,
        minPrice: newFilterOptions.minPrice,
        maxPrice: newFilterOptions.maxPrice,
      };

      router.push({ pathname, query: updatedQuery });
    }

    // Update the state
    setFilterOptions(newFilterOptions);
  }

  const Header: HeaderProps = {
    title: {
      single: `Displaying ${listingCount} search result for: "${search || ''}"`,
      plural: `Displaying ${listingCount} search results for: "${search || ''}"`,
    },
    noOfItems: listings.length,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <DisplayResults
        filter
        data={Header}
        filterOptions={filterOptions}
        setFilterOptions={updateFilterOptions}
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
