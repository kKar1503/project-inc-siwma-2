// ** React Imports
import { useState, useEffect, useMemo } from 'react';

// ** Next Imports
import Head from 'next/head';
import { useRouter } from 'next/router';

// ** MUI Imports
import Box from '@mui/material/Box';

// ** Custom Components Imports
import ProfileDetailCard from '@/components/marketplace/profile/ProfileDetailCard';

// ** HooksImports
import { useTheme } from '@mui/material/styles';
import { useResponsiveness } from '@inc/ui';
import useUser from '@/services/users/useUser';
import { useQuery } from 'react-query';
import apiClient from '@/utils/api/client/apiClient';
import { listingSchemas } from '@/utils/api/client/zod';
import ListingTable from '@/components/marketplace/listing/ListingTable';
import useProducts from '@/services/listings/useProducts';
import useParameters from '@/services/listings/useParameters';
import { useTablePagination, useTableSort } from '@/stores/table';
import useProductStore from '@/stores/products';
import useParamStore from '@/stores/parameters';
import useBookmarkStore from '@/stores/bookmarks';
import { Listing } from '@/utils/api/server/zod/listingTable';

const ProfilePage = () => {
  // ** Hooks
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: user,
    error: userError,
    isError: isUserError,
    isFetched: isUserFetched,
  } = useUser(id);

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

  const { data: listings, isLoading: isListingsLoading } = useQuery({
    queryFn: async () =>
      apiClient
        .get(`/v1/users/${id}/listings`)
        // parse data through zod to ensure data is correct
        .then((res) => listingSchemas.getAll.parse(res.data.data))
        .then((ls) =>
          ls.map(
            (l) =>
              ({
                id: l.id,
                type: l.type,
                price: l.price,
                product: l.productId,
                quantity: l.quantity,
                negotiable: l.negotiable,
                createdAt: l.createdAt,
                owner: {
                  id: l.owner.id,
                  name: l.owner.name,
                  profilePic: l.owner.profilePic,
                  company: {
                    name: l.owner.company.name,
                    website: l.owner.company.website,
                  },
                },
                parameters:
                  l.parameters?.map((p) => ({
                    value: p.value,
                    parameterId: parseInt(p.paramId, 10),
                  })) || [],
              } as Listing)
          )
        ),
    queryKey: ['userListings', id],
    enabled: !!id,
  });

  const theme = useTheme();
  const { spacing } = theme;
  const [isMd, isLg] = useResponsiveness(['md', 'lg']);

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
      listings.forEach((l) => {
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

  // ** Effects
  useEffect(() => {
    if (!isUserFetched) {
      return;
    }

    if (isUserError) {
      if ('status' in (userError as any) && (userError as any).status === 404) {
        router.replace('/404');
        return;
      }

      router.replace('/500');
      return;
    }

    if (user === undefined) {
      router.replace('/500');
    }
  }, [isUserFetched]);

  // ** Styles
  const spaceStyle = useMemo(() => {
    if (isMd) {
      return {
        py: spacing(3),
        px: '40px',
        height: '100%;',
        width: '100%',
      };
    }
    if (isLg) {
      return {
        py: spacing(3),
        px: '60px',
        height: '100%;',
        width: '100%',
        display: 'flex',
        gap: 5,
      };
    }
    return {
      py: spacing(3),
      px: '20px',
      height: '100%;',
      width: '100%',
    };
  }, [isMd, isLg]);

  return (
    <main>
      <Box sx={spaceStyle}>
        {user && <ProfileDetailCard data={user} visibleEditButton />}
        <Box>
          <ListingTable
            isLoading={isListingsLoading}
            isProductFetching={isProductsFetching || pageLoading}
            isParamFetching={isParamsFetching || pageLoading}
            listings={listings || []}
            sx={{ px: 0 }}
          />
        </Box>
      </Box>
    </main>
  );
};

export default ProfilePage;
