import { ChangeEvent, useState } from 'react';

const usePagination = (pageSize: number) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    rowPageOptions: [pageSize, pageSize * 2, pageSize * 4]
  };
};

export default usePagination;
