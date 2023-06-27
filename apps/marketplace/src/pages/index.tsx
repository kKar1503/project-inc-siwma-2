import React, { useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

import Carousel from '@/components/marketplace/carousel/AdvertisementCarousel';
import ListingStream from '@/components/marketplace/listing/ListingStream';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import CategoryCard from '@/components/marketplace/listing/Categories';

import fetchCategories from '@/middlewares/fetchCategories';
import fetchListings from '@/middlewares/fetchListings';
import fetchAdvertisements from '@/middlewares/fetchAdvertisements';
import fetchPopularListings from '@/middlewares/fetchPopularListings';

import { InfiniteScroll, useResponsiveness } from '@inc/ui';
import AdvertisementsPlaceholder from '@/components/marketplace/carousel/AdvertisementsPlaceholder';
import { useTheme } from '@mui/material';
import { Listing } from '@/utils/api/client/zod';
import { useTranslation } from 'react-i18next';

// changed all to not refetch on window refocus or reconnect
// this is to prevent constantly making requests
// or updating data that is not supposed to be updated
const useGetCategoriesQuery = () => {
  let { data } = useQuery('categories', async () => fetchCategories(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  data = data?.slice(0, 6);

  return data;
};

const useGetAdvertisementsQuery = (permissions: number | undefined) => {
  const { data } = useQuery(
    ['advertisements', permissions],
    async () => fetchAdvertisements(permissions!),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return data;
};

const useGetPopularListingsQuery = () => {
  const { data } = useQuery('popular', async () => fetchPopularListings(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return data;
};

const Marketplace = () => {
  const { data: session } = useSession();
  const [isSm, isMd, isLg, isXl] = useResponsiveness(['sm', 'md', 'lg', 'xl']);
  const { typography } = useTheme();
  const { t } = useTranslation();
  const scrollRef = useRef<Element>(null);

  const [listings, setListings] = React.useState<Array<Listing>>([]);
  const [lastListingId, setLastListingId] = React.useState<number>(9);
  const [maxItems, setMaxItems] = React.useState<boolean>(false);

  const { isLoading, refetch } = useQuery(
    ['listings', lastListingId],
    async () => fetchListings(lastListingId),
    {
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

  const categories = useGetCategoriesQuery();
  const advertisementsData = useGetAdvertisementsQuery(session?.user.permissions);
  const popularListingsData = useGetPopularListingsQuery();

  useEffect(() => {
    const totalListingsCount = listings.length;
    let listingsNeededCount = 0;

    if (isXl) {
      listingsNeededCount = 5 - (totalListingsCount % 5);
    } else if (isLg) {
      listingsNeededCount = 4 - (totalListingsCount % 5);
    } else if (isMd) {
      listingsNeededCount = 3 - (totalListingsCount % 5);
    }

    const listingsNeeded = listings.slice(0, listingsNeededCount);
    setListings((prev) => [...prev, ...listingsNeeded]);
  }, [maxItems]);

  const headerStyles = useMemo(() => {
    if (isSm) {
      return {
        switchTxt: {
          fontSize: typography.h6,
          zIndex: 99,
        },
      };
    }

    if (isMd) {
      return {
        switchTxt: {
          fontSize: typography.h5,
          fontWeight: 500,
          zIndex: 99,
        },
      };
    }

    if (isLg) {
      return {
        switchTxt: {
          fontSize: typography.h4,
          zIndex: 99,
        },
      };
    }

    return {
      switchTxt: {
        fontSize: '24px',
      },
    };
  }, [isSm, isMd, isLg]);

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
          <Typography sx={headerStyles?.switchTxt}>{t('Categories')}</Typography>
          <Link href="/categories" sx={headerStyles?.switchTxt}>
            {t('View All Categories')}
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <Grid container spacing={2} width="95%">
          {categories?.map((category) => (
            <Grid item xl={2} lg={3} md={4} sm={6} xs={6} key={category.name}>
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
          <Typography sx={headerStyles?.switchTxt}>{t('Popular')}</Typography>
        </Box>
      </Box>
      <ListingStream listingItemsData={popularListingsData} />
      <Box display="flex" justifyContent="center" marginTop="2em">
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Typography sx={headerStyles?.switchTxt}>{t('Recommended')}</Typography>
        </Box>
      </Box>
      <Box marginTop="2em" display="flex" flexDirection="column" justifyContent="center">
        <Box marginX="2rem">
          <InfiniteScroll
            onLoadMore={refetch}
            loading={isLoading}
            reachedMaxItems={maxItems}
            loadingComponent={<CircularProgress />}
            parent={Grid}
            endMessage={
              <Typography
                variant="h6"
                textAlign="center"
                sx={({ spacing }) => ({
                  my: spacing(5),
                  textAlign: 'center',
                  textTransform: 'uppercase',
                })}
              >
                No more listings available
              </Typography>
            }
            parentProps={{
              container: true,
              display: 'flex',
              gap: 2,
              justifyContent: 'space-evenly',
            }}
            child={Grid}
            childProps={{
              item: true,
              xl: 2,
              lg: 2.5,
              md: 3.5,
              sm: 5,
              xs: 12,
            }}
          >
            {listings?.map((item) => (
              <ProductListingItem data={item} key={item.id} />
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
    </>
  );
};

export default Marketplace;
