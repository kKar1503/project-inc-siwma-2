import React, { useEffect } from 'react';
import ListingTable from '@/components/marketplace/listing/ListingTable';
import useListings from '@/services/listings/useListings';
import { useTablePagination, useTableSort } from '@/stores/table';

const ListingTableTest = () => {
  const [paginationStates, paginationActions] = useTablePagination();
  const [sortStates] = useTableSort();
  const { page, limit } = paginationStates;
  const { sortBy, sortDirection } = sortStates;
  const { data } = useListings(limit, page, { sortDirection, sortBy });

  useEffect(() => {
    if (data !== undefined) {
      paginationActions.setPagination(data.pagination);
    }
  }, [data]);

  return <ListingTable listings={data?.listings || []} />;
};

export default ListingTableTest;
