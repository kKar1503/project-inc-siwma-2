import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import BaseTableHead, { Header } from './BaseTableHead';
import BaseTableToolbar from './BaseTableToolbar';

// -- Type definitions -- //
export interface BaseTableData {
  id: string;
  [key: string]: string | number | boolean;
}

type BaseTableProps = {
  headers: Header[];
  rows: BaseTableData[];
  rowsPerPageOptions: React.ComponentProps<typeof TablePagination>['rowsPerPageOptions'];
  totalCount: number;
  onPageChange: React.ComponentProps<typeof TablePagination>['onPageChange'];
  onRowsPerPageChange: React.ComponentProps<typeof TablePagination>['onRowsPerPageChange'];
  onEdit: (row: BaseTableData) => void;
  onToggle: (toggled: boolean, rows: readonly BaseTableData[]) => void;
  onDelete: (rows: readonly BaseTableData[]) => void;
  rowsPerPage: number;
  page: number;
};

const BaseTable = (props: BaseTableProps) => {
  const [selected, setSelected] = useState<readonly BaseTableData[]>([]);

  // Destructure props
  const {
    rows,
    headers,
    rowsPerPageOptions,
    totalCount,
    onPageChange,
    onRowsPerPageChange,
    onEdit,
    onToggle,
    onDelete,
    rowsPerPage,
    page,
  } = props;

  /**
   * Event handlers
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: BaseTableData) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected: readonly BaseTableData[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (row: BaseTableData) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <BaseTableToolbar
          heading="Desserts"
          selectedRows={selected}
          toggleColumn="enabled"
          onEdit={() => onEdit(selected[0])}
          onToggle={(e, toggled) => onToggle(toggled, selected)}
          onDelete={() => onDelete(selected)}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <BaseTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              columns={headers}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {
                      // Render each column
                      headers.map((header, index) => (
                        <TableCell
                          component={index === 0 ? 'th' : undefined}
                          align="left"
                          key={header.key}
                          scope="row"
                        >
                          {
                            // Render the value of the column
                            // Check if the value has any special rendering
                            // eslint-disable-next-line no-nested-ternary
                            header.replace
                              ? header.replace[row[header.key].toString()] !== undefined
                                ? header.replace[row[header.key].toString()]
                                : row[header.key].toString()
                              : row[header.key].toString()
                          }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                );
              })}
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
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
};

export default BaseTable;