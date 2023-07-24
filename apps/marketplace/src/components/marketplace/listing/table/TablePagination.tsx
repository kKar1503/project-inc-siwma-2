// ** React Imports
import React from 'react';

// ** MUI Imports
import MuiTablePagination from '@mui/material/TablePagination';

// ** Store Imports
import { useTablePagination } from '@/stores/table';

const TablePagination = () => {
  // ** Store
  const [paginationStates, paginationActions] = useTablePagination();
  const { limit, totalCount, totalPage, page, nextPage, prevPage } = paginationStates;
  const { updatePagination } = paginationActions;

  // ** Handlers
  const handlePageChange = (_: unknown, page: number) => {
    console.log({ page });
    updatePagination({ page });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updatePagination({ limit: parseInt(event.target.value, 10) });
  };

  return (
    <MuiTablePagination
      rowsPerPageOptions={[10, 25, 50]}
      component="div"
      count={totalCount}
      rowsPerPage={limit}
      page={page}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default TablePagination;
