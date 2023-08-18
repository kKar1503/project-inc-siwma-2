import { ChangeEvent, useEffect, useState } from 'react';


const usePagination = (pageSize: number, numberOfRows: number) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    const focusedElement = page * rowsPerPage;
    const newPage = Math.floor(focusedElement / +event.target.value);
    setPage(newPage);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - numberOfRows);

  useEffect(() => {
    const focusedElement = page * rowsPerPage;
    if (focusedElement >= numberOfRows) {
      const newPage = Math.max(Math.floor(numberOfRows / rowsPerPage) - 1, 0);
      setPage(newPage);
    }
  }, [numberOfRows]);

  return {
    emptyRows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    rowPageOptions: [pageSize, pageSize * 2, pageSize * 4],
  };
};

export default usePagination;
