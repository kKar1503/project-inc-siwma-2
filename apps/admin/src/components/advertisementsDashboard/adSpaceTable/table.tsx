import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainHeader from '@/components/advertisementsDashboard/adSpaceTable/mainHeader';
import RowHeader from '@/components/advertisementsDashboard/adSpaceTable/rowHeader';
import { rows } from '@/components/advertisementsDashboard/adSpaceTable/utils';
import RowBody from '@/components/advertisementsDashboard/adSpaceTable/rowBody';
import usePagination from '@/components/advertisementsDashboard/adSpaceTable/hooks/usePagination';

interface Props {
  active: boolean;
}

// eslint-disable-next-line react/function-component-definition
export default function({
                          active,
                        }: Props) {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    rowPageOptions
  } = usePagination(4);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => {
      const pageStart = page * rowsPerPage;
      const pageEnd = pageStart + rowsPerPage;
      return rows.slice(pageStart, pageEnd);
    },
    [page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <MainHeader numSelected={selected.length} active={active} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <RowHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {
                visibleRows.map((row, index) => {
                  const isSelected = selected.indexOf(row.name) !== -1;
                  return <RowBody row={row} index={index} isSelected={isSelected} onSelect={handleClick} />;
                })
              }
              {/* Add empty rows to the end of the table if there are fewer than rowsPerPage */}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowPageOptions}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
