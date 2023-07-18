import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import MainHeader from '@/components/advertisementsDashboard/adSpaceTable/mainHeader';
import RowHeader from '@/components/advertisementsDashboard/adSpaceTable/rowHeader';
import RowBody from '@/components/advertisementsDashboard/adSpaceTable/rowBody';
import usePagination from '@/components/advertisementsDashboard/adSpaceTable/hooks/usePagination';
import { DataType } from '@/components/advertisementsDashboard/adSpaceTable/dataLayout';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';

export interface Props {
  rows: readonly DataType[];
  onDelete: (elements: readonly DataType[]) => void;
  onEdit: (element: DataType) => void;
  onSetActive: (elements: readonly DataType[]) => void;
  onSetInactive: (elements: readonly DataType[]) => void;
}

// eslint-disable-next-line react/function-component-definition
export default function({
                          rows,
                          onDelete,
                          onEdit,
                          onSetActive,
                          onSetInactive,
                        }: Props) {
  const [selected, setSelected] = useState<readonly DataType[]>([]);
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    rowPageOptions,
  } = usePagination(4);

  const data = rows;
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
      setSelected(data);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, element: DataType) => {
    const selectedIndex = selected.indexOf(element);
    let newSelected: readonly DataType[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, element);
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

  const handleSetActive = () => {
    onSetActive(selected);
    setSelected([]);
  };
  const handleSetInactive = () => {
    onSetInactive(selected);
    setSelected([]);
  };


  return (
    <ModuleBase noFlex>
      <MainHeader
        selected={selected}
        onSetActive={handleSetActive}
        onSetInactive={handleSetInactive}
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
                  const isSelected = selected.indexOf(row) !== -1;
                  return <RowBody row={row} index={index} isSelected={isSelected} onSelect={handleClick} />;
                })
              }
              {/* Add empty rows to the end of the table if there are fewer than rowsPerPage */}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53.25 * emptyRows,
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
    </ModuleBase>
  );
}
