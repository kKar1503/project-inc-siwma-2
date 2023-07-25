import React, { useState, useRef, useEffect } from 'react';
import { useResponsiveness } from '@inc/ui';
import { useQueries, useMutation } from 'react-query';
import apiClient from '@/utils/api/client/apiClient';
import fetchListingItems from '@/services/fetchListingItems';
import { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import ListingItemsTable from '@/components/tables/ListingItemsTable';
import { Box } from '@mui/material';
import SuccessModal from '@/components/modals/SuccessModal';
import { useRouter } from 'next/router';

const deleteListingItemsMutationFn = async (ids: string[]) => {
  const promises = ids.map((id) => apiClient.delete(`/v1/products/${id}`));
  await Promise.all(promises);
};

const AllListingItems = () => {
  const [deleteListingItem, setDeleteListingItem] = useState<boolean>(false);
  const [lastIdPointer, setLastIdPointer] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currPage, setPage] = useState<number>(0);
  const totalCount = useRef(0);
  const router = useRouter();

  const queries = useQueries([
    {
      queryKey: ['products', lastIdPointer],
      queryFn: async () => {
        const data = await fetchListingItems({ lastIdPointer, limit: rowsPerPage });
        console.log(data);
        totalCount.current = data.totalCount;
        return data;
      },
      refetchInterval: 300000,
    },
  ]);

  const { mutate: deleteListingItems } = useMutation(
    'deleteListingItems',
    deleteListingItemsMutationFn,
    {
      onSuccess: (_, uuids) => {
        setDeleteListingItem(true);

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
    }
  );

  // Refetch data everytime rowsPerPage changes
  useEffect(() => {
    queries[0].refetch();
  }, [rowsPerPage]);

  const { data } = queries[0];
  const listingItems = data?.listingItemsData;

  const handleDeleteListingItems = (rows: readonly BaseTableData[]) => {
    // Map the UUIDs
    const uuids = rows.map((row) => row.id);

    // Delete the listings from db
    deleteListingItems(uuids);

    return [];
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    // Initalise id
    const id = page * rowsPerPage;

    // Calculate the next id to fetch
    setPage(page);
    setLastIdPointer(id);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update rows per page
    setRowsPerPage(parseInt(event.target.value, 10));

    // Calculate the updated page number
    const page = Math.floor(lastIdPointer / parseInt(event.target.value, 10));

    // Update page
    setPage(page);

    // Check if we need to update lastIdPointer
    if (totalCount.current - (page + 1) * parseInt(event.target.value, 10) < 0) {
      // Update lastIdPointer
      setLastIdPointer(0);
    }
  };

  const onEdit = (row: BaseTableData) => {
    router.replace(`/listing/editListingItemForm/${row.id}`);
  };

  const onToggle = () => {
    // nothing to do
  };

  return (
    <Box
      sx={{
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // minHeight: '100vh',
        // paddingX: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <ListingItemsTable
        data={listingItems || []}
        onDelete={handleDeleteListingItems}
        onPageChange={handlePageChange}
        totalCount={totalCount.current}
        onEdit={onEdit}
        onRowsPerPageChange={handleRowsPerPageChange}
        onToggle={onToggle}
        rowsPerPage={rowsPerPage}
        page={currPage}
      />
      <SuccessModal
        title="Successfully Deleted!"
        content="Selected Listing Item(s) have been successfully deleted"
        open={deleteListingItem}
        setOpen={setDeleteListingItem}
        buttonText="Return"
        path="/listing/listing-items"
      />
    </Box>
  );
};

export default AllListingItems;
