import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
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
import RowBody from '@/components/advertisementsDashboard/adSpaceTable/rowBody';
import usePagination from '@/components/advertisementsDashboard/adSpaceTable/hooks/usePagination';
import { DataType } from '@/components/advertisementsDashboard/adSpaceTable/dataLayout';

interface Props {
  active: boolean;
  rows: readonly DataType[];
  onDelete: (ids: readonly string[]) => void;
  onEdit: (id: string) => void;
  onChangeActiveStatus: (ids: readonly string[]) => void;
}

// eslint-disable-next-line react/function-component-definition
export default function({
                          active,
                          rows,
                          onDelete,
                          onEdit,
                          onChangeActiveStatus,
                        }: Props) {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    rowPageOptions,
  } = usePagination(4);

  const data = useMemo(() => rows.filter(r => r.active === active), [active]);
  const visibleRows = useMemo(
    () => {
      const pageStart = page * rowsPerPage;
      const pageEnd = pageStart + rowsPerPage;
      return data.slice(pageStart, pageEnd);
    },
    [page, rowsPerPage],
  );
  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
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
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - data.length);


  const handleDelete = () => {
    onDelete(selected);
    setSelected([]);
  };

  const handleEdit = () => {
    onEdit(selected[0]);
    setSelected([]);
  };

  const handleChangeStatus = () => {
    onChangeActiveStatus(selected);
    setSelected([]);
  };


  return (
    <Box sx={{ width: '120%'}}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <MainHeader
          numSelected={selected.length}
          active={active}
          onChangeActiveStatus={handleChangeStatus}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 550 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <RowHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {
                visibleRows.map((row, index) => {
                  const isSelected = selected.indexOf(row.id) !== -1;
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
