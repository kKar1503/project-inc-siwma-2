import React, { useState, useRef } from 'react';
import { useResponsiveness } from '@inc/ui';
import { useQueries, useMutation } from 'react-query';
import apiClient from '@/utils/api/client/apiClient';
import fetchListings from '@/middlewares/fetchListings';
import { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import AllListingsTable from '@/components/tables/AllListingsTable';
import { Box } from '@mui/material';

const deleteListingsMutationFn = async (ids: string[]) => {
  const promises = ids.map((id) => apiClient.delete(`/v1/listings/${id}`));
  await Promise.all(promises);
};

const AllListings = () => {
  const [deleteListing, setDeleteListing] = useState<boolean>(false);
  const [lastIdPointer, setLastIdPointer] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currPage, setPage] = useState<number>(0);
  const totalCount = useRef(0);

  const queries = useQueries([
    {
      queryKey: ['listings', lastIdPointer],
      queryFn: async () => {
        const data = await fetchListings({ lastIdPointer, limit: rowsPerPage });
        console.log(data.totalCount);
        totalCount.current = data.totalCount;
        return data;
      },
      refetchInterval: 300000,
    },
  ]);

  const { mutate: deleteListings } = useMutation('deleteListings', deleteListingsMutationFn, {
    onSuccess: (_, uuids) => {
      setDeleteListing(true);

      // Calculate the expected total count and max page
      const newTotalCount = totalCount.current - uuids.length;
      const maxPage = Math.ceil(newTotalCount / rowsPerPage) - 1;

      console.log({ currPage, maxPage, lastIdPointer, length: uuids.length });

      // Check if we're out of bounds
      if (currPage > maxPage) {
        // Go back to max page
        setPage(maxPage);
      }

      // Update lastIdPointer
      setLastIdPointer(maxPage * rowsPerPage);

      // Refetch the listings data
      queries[0].refetch();
    },
  });

  const { data } = queries[0];
  const listings = data?.listingsData;

  const handleDeleteListings = (rows: readonly BaseTableData[]) => {
    // Map the UUIDs
    const uuids = rows.map((row) => row.id);

    // Delete the listings from db
    deleteListings(uuids);

    return [];
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    // Iniitalise id
    const id = page * rowsPerPage;

    // Calculate the next id to fetch
    setPage(page);
    setLastIdPointer(id);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };

  const onEdit = () => {
    // nothing to do
  };

  const onToggle = () => {
    // nothing to do
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AllListingsTable
        data={listings || []}
        onDelete={handleDeleteListings}
        onPageChange={handlePageChange}
        totalCount={totalCount.current}
        onEdit={onEdit}
        onRowsPerPageChange={handleRowsPerPageChange}
        onToggle={onToggle}
        rowsPerPage={rowsPerPage}
        page={currPage}
      />
    </Box>
  );
};

export default AllListings;
