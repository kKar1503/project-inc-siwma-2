import React, { useRef } from 'react';
import { Box, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
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

import InfiniteScroll from '@inc/ui/lib/components/InfiniteScroll';
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
  const theme = useTheme();
  const { data: session } = useSession();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
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
      {advertisementsData?.length ? <Carousel data={advertisementsData} /> : <AdvertisementsPlaceholder />}
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
      <Box display="flex" justifyContent="center" paddingTop="4em">
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Typography variant="h4">Recommended</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <InfiniteScroll
          onLoadMore={refetch}
          loading={isLoading}
          reachedMaxItems={maxItems}
          parent={Grid}
          parentProps={{
            container: true,
            spacing: 2,
            width: '80%',
            gap: 2,
          }}
          child={Grid}
          childProps={{
            item: true,
            xl: 2,
            lg: 3,
            md: 4,
            sm: 6,
            xs: 12,
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
