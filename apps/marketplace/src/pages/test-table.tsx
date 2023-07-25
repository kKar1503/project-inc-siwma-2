import React, { useEffect, useState } from 'react';
import ListingTable from '@/components/marketplace/listing/ListingTable';
import useListings from '@/services/listings/useListings';
import useProducts from '@/services/listings/useProducts';
import useParameters from '@/services/listings/useParameters';
import { useTablePagination, useTableSort } from '@/stores/table';
import useProductStore from '@/stores/products';
import useParamStore from '@/stores/parameters';
import useUser from '@/services/users/useUser';
import { useSession } from 'next-auth/react';
import useBookmarkStore from '@/stores/bookmarks';

const ListingTableTest = () => {
  const session = useSession();
  const userId = session.data?.user.id;

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
          if (existingParams.indexOf(stringParamId) === 1) paramIds.add(stringParamId);
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

  return (
    <ListingTable
      isLoading={isListingsLoading}
      isProductFetching={isProductsFetching || pageLoading}
      isParamFetching={isParamsFetching || pageLoading}
      listings={listings?.listings || []}
    />
  );
};

export default ListingTableTest;
