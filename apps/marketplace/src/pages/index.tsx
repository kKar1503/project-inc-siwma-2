import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

import Carousel from '@/components/marketplace/carousel/AdvertisementCarousel';
import CategoryCard from '@/components/marketplace/listing/Categories';

import fetchCategories from '@/services/fetchCategories';
import fetchAdvertisements from '@/services/fetchAdvertisements';

import { useResponsiveness } from '@inc/ui';
import AdvertisementsPlaceholder from '@/components/marketplace/carousel/AdvertisementsPlaceholder';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ListingTable from '@/components/marketplace/listing/ListingTable';
import useProducts from '@/services/listings/useProducts';
import useParameters from '@/services/listings/useParameters';
import useListings from '@/services/listings/useListings';
import useUser from '@/services/users/useUser';
import { useTablePagination, useTableSort } from '@/stores/table';
import useBookmarkStore from '@/stores/bookmarks';
import useParamStore from '@/stores/parameters';
import useProductStore from '@/stores/products';
import { SxProps } from '@mui/material/styles';

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

const Marketplace = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [paginationStates, paginationActions] = useTablePagination();
  const [products, addProducts] = useProductStore((state) => [state.products, state.addProducts]);
  const [parameters, addParams] = useParamStore((state) => [state.params, state.addParams]);
  const setBookmarks = useBookmarkStore((state) => state.setBookmarks);

  const [sortStates] = useTableSort();
  const { page, limit } = paginationStates;
  const { sortBy, sortDirection } = sortStates;
  const [paramIdsToFetch, setParamIdsToFetch] = useState<string[]>([]);
  const [productIdsToFetch, setProductIdsToFetch] = useState<string[]>([]);

  const [pageLoading, setPageLoading] = useState(false);

  const { data: user } = useUser(userId);

  const { data: listings, isLoading: isListingsLoading } = useListings(limit, page, {
    sortDirection,
    sortBy,
  });
  const { data: params, isFetching: isParamsFetching } = useParameters(paramIdsToFetch);
  const { data: productsFetchData, isFetching: isProductsFetching } =
    useProducts(productIdsToFetch);

  useEffect(() => {
    if (user !== undefined) {
      setBookmarks(user.bookmarks?.listings ?? []);
    }
  }, [user]);

  useEffect(() => {
    if (isListingsLoading) {
      setPageLoading(true);
    }
  }, [isListingsLoading]);

  useEffect(() => {
    if (listings !== undefined) {
      let toContinueLoad = false;
      const existingProducts = Object.keys(products);
      const existingParams = Object.keys(parameters);
      const paramIds = new Set<string>();
      const productIds = new Set<string>();
      listings.listings.forEach((l) => {
        if (existingProducts.indexOf(l.product) === -1) productIds.add(l.product);
        l.parameters.forEach((p) => {
          const stringParamId = p.parameterId.toString();
          if (existingParams.indexOf(stringParamId) === -1) paramIds.add(stringParamId);
        });
      });

      if (productIds.size !== 0) {
        setProductIdsToFetch([...productIds]);
        toContinueLoad = true;
      }

      if (paramIds.size !== 0) {
        setParamIdsToFetch([...paramIds]);
        toContinueLoad = true;
      }

      if (!toContinueLoad) {
        setPageLoading(false);
      }

      paginationActions.setPagination(listings.pagination);
    }
  }, [listings]);

  useEffect(() => {
    if (params !== undefined && params.length !== 0) {
      addParams(params);
    }
  }, [params]);

  useEffect(() => {
    if (productsFetchData !== undefined && productsFetchData.length !== 0) {
      addProducts(productsFetchData);
    }
  }, [productsFetchData]);

  useEffect(() => {
    if (!isParamsFetching && !isProductsFetching) {
      setPageLoading(false);
    }
  }, [isProductsFetching, isParamsFetching]);

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { typography } = useTheme();
  const { t } = useTranslation();

  const categories = useGetCategoriesQuery();
  const advertisementsData = useGetAdvertisementsQuery(session?.user.permissions);

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

  const maxWidthContainer = useMemo<SxProps>(() => {
    if (!isSm) return { minWidth: 900, px: 'calc(50vw - 656px)' };
    return {};
  }, [isSm]);

  return (
    <>
      {advertisementsData?.length ? (
        <Carousel data={advertisementsData} />
      ) : (
        <AdvertisementsPlaceholder />
      )}
      <Box sx={{ ...maxWidthContainer }}>
        <Box display="flex" justifyContent="space-between" paddingTop="2em">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography sx={headerStyles?.switchTxt}>{t('Categories')}</Typography>
            <Link href="/categories" sx={headerStyles?.switchTxt}>
              {t('View All Categories')}
            </Link>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" paddingTop="2em" sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            {categories?.map((category) => (
              <Grid item xl={2} lg={3} md={4} xs={6} key={category.name}>
                <CategoryCard {...category} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <ListingTable
        isLoading={isListingsLoading}
        isProductFetching={isProductsFetching || pageLoading}
        isParamFetching={isParamsFetching || pageLoading}
        listings={listings?.listings || []}
      />
    </>
  );
};

export default Marketplace;
