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
  heading: string;
  headers: Header[];
  customHeader?: React.ReactNode;
  rows: BaseTableData[];
  rowsPerPageOptions: React.ComponentProps<typeof TablePagination>['rowsPerPageOptions'];
  totalCount: number;
  onPageChange: React.ComponentProps<typeof TablePagination>['onPageChange'];
  onRowsPerPageChange: React.ComponentProps<typeof TablePagination>['onRowsPerPageChange'];
  onEdit?: (row: BaseTableData) => void;
  onToggle?: (toggled: boolean, rows: readonly BaseTableData[]) => void;
  onDelete?: (rows: readonly BaseTableData[]) => BaseTableData[];
  rowsPerPage: number;
  page: number;
  sx?: React.ComponentProps<typeof Box>['sx'];
  placeholderMessage?: string;
};

/**
 * Build wrapper tables around this component
 * @param heading - The heading of the table
 * @param rows - The data to display in the table
 * @param headers - The headers to display in the table
 * @param customHeader - The custom header to display in the table
 * @param rowsPerPageOptions - The options for the rows per page dropdown
 * @param totalCount - The total number of rows (including the ones not displayed on the current page)
 * @param onPageChange - The callback for when the page changes
 * @param onRowsPerPageChange - The callback for when the rows per page changes
 * @param onEdit - The callback for when the edit button is clicked
 * @param onToggle - The callback for when the toggle button is clicked
 * @param onDelete - The callback for when the delete button is clicked (Should return an updated array of selected rows)
 * @param rowsPerPage - The number of rows per page
 * @param page - The current page
 * @param sx - Styling
 * @param placeholderMessage - The message to display when there are no rows
 */
const BaseTable = (props: BaseTableProps) => {
  const [selected, setSelected] = useState<readonly BaseTableData[]>([]);

  // Destructure props
  const {
    heading,
    rows,
    headers,
    customHeader,
    rowsPerPageOptions,
    totalCount,
    onPageChange,
    onRowsPerPageChange,
    onEdit,
    onToggle,
    onDelete,
    rowsPerPage,
    page,
    sx,
    placeholderMessage,
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
    const selectedRow = selected.find((e) => e.id === row.id);
    const selectedRowIndex = selected.indexOf(row);
    let newSelected: BaseTableData[] = [...selected];

    // !! FIXME: later
    // Select the row if it is not selected
    if (selectedRow === undefined) {
      newSelected = newSelected.concat(row);
    }

    // Unselect the row if it was selected
    if (selectedRow) {
      // Remove the object from the array
      newSelected.splice(selectedRowIndex, 1);
    }

    setSelected(newSelected);
  };

  const handleDelete = () => {
    if (!onDelete) return;

    // Invoke the callback function
    const result = onDelete(selected);

    // Update the selection
    setSelected(result);
  };

  const isSelected = (row: BaseTableData) => selected.find((e) => e.id === row.id) !== undefined;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rowsPerPage - rows.length;

  return (
    <Box width="100%" height="100%" sx={sx}>
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {customHeader ?? customHeader}
        <BaseTableToolbar
          heading={heading}
          selectedRows={selected}
          toggleColumn="enabled"
          onEdit={onEdit ? () => onEdit(selected[0]) : undefined}
          onToggle={onToggle ? (e, toggled) => onToggle(toggled, selected) : undefined}
          onDelete={onDelete ? handleDelete : undefined}
        />
        <TableContainer sx={{ flexGrow: 1 }}>
          <Table width="100%" aria-labelledby="tableTitle" stickyHeader>
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
              {rows.length > 0 && emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {
                // Render a placeholder message if there are no rows
                placeholderMessage
                  ? rows.length === 0 && (
                      <TableRow
                        style={{
                          height: 53 * rowsPerPage,
                        }}
                      >
                        <TableCell colSpan={6} align="center">
                          {placeholderMessage}
                        </TableCell>
                      </TableRow>
                    )
                  : null
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ flexGrow: 0, overflow: 'initial' }}
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
