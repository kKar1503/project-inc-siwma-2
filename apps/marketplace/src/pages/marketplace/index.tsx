import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

import Carousel from '@/components/marketplace/carousel/AdvertisementCarousel';
import ListingStream from '@/components/marketplace/listing/ListingStream';
import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';
import CategoryCard from '@/components/marketplace/listing/Categories';

import fetchCategories from '@/middlewares/fetchCategories';
import fetchListings from '@/middlewares/fetchListings';
import fetchAdvertisements from '@/middlewares/fetchAdvertisements';
import fetchPopularListings from '@/middlewares/fetchPopularListings';

import { InfiniteScroll, useResponsiveness } from '@inc/ui';
import AdvertisementsPlaceholder from '@/components/marketplace/carousel/AdvertisementsPlaceholder';

const useGetCategoriesQuery = () => {
  const { data } = useQuery('categories', async () => fetchCategories());

  return data;
};

const useGetAdvertisementsQuery = (permissions: number | undefined) => {
  const { data } = useQuery('advertisements', async () => fetchAdvertisements(permissions!));

  return data;
};

const useGetPopularListingsQuery = () => {
  const { data } = useQuery('popular', async () => fetchPopularListings());

  return data;
};

const Marketplace = () => {
  const { data: session } = useSession();
  const isMediumScreen = useResponsiveness(['md']);
  const scrollRef = useRef<Element>(null);

  const [listings, setListings] = React.useState<Array<ProductListingItemProps>>([]);
  const [lastListingId, setLastListingId] = React.useState<number>(9);
  const [maxItems, setMaxItems] = React.useState<boolean>(false);

  const { isLoading, refetch } = useQuery(
    ['listings', lastListingId],
    async () => fetchListings(lastListingId),
    {
      onSuccess: (data) => {
        const lastItem = data[data.length - 1];
        if (lastItem) {
          setLastListingId(lastItem.productId);
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

  const categories = useGetCategoriesQuery();
  const advertisementsData = useGetAdvertisementsQuery(session?.user.permissions);
  const popularListingsData = useGetPopularListingsQuery();

  return (
    <>
      {advertisementsData?.length ? (
        <Carousel data={advertisementsData} />
      ) : (
        <AdvertisementsPlaceholder />
      )}
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
          }}
        >
          <Typography sx={{ fontSize: isMediumScreen ? '22px' : '36px' }}>Categories</Typography>
          <Link href="/" sx={{ fontSize: isMediumScreen ? '22px' : '36px' }}>
            View All Categories
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <Grid container spacing={2} width="80%">
          {categories?.map((category) => (
            <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={category.name}>
              <CategoryCard {...category} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="4em">
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Typography variant="h4">Popular</Typography>
        </Box>
      </Box>
      <ListingStream listingItemsData={popularListingsData} />
      <Box display="flex" justifyContent="center" marginTop="2em">
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Typography variant="h4">Recommended</Typography>
        </Box>
      </Box>
      <Box marginTop="2em">
        <InfiniteScroll
          onLoadMore={refetch}
          loading={isLoading}
          reachedMaxItems={maxItems}
          loadingComponent={<CircularProgress />}
          parent={Grid}
          endMessage={<Typography variant="h6" textAlign="center">No more listings</Typography>}
          parentProps={{
            container: true,
            spacing: 2,
            gap: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
          child={Grid}
          childProps={{
            item: true,
            maxWidth: 'fit-content',
            width: 'fit-content',
            xl: 2,
            lg: 2.5,
            md: 3.5,
            sm: 5,
            xs: 12,
          }}
          infiniteScrollSx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {listings?.map((item) => (
            <ProductListingItem data={item} key={item.productId} />
          ))}
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default Marketplace;
