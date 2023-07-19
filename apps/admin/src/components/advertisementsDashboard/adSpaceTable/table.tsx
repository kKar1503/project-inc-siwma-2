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
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import { Advertisment } from '@/utils/api/client/zod/advertisements';
import { Company } from '@/utils/api/client/zod/companies';

export interface Props {
  companies: readonly Company[];
  advertisements: readonly Advertisment[];
  onDelete: (elements: readonly Advertisment[]) => void;
  onEdit: (element: Advertisment) => void;
  onSetActive: (elements: readonly Advertisment[]) => void;
  onSetInactive: (elements: readonly Advertisment[]) => void;
}

// eslint-disable-next-line react/function-component-definition
export default function({
                          companies,
                          advertisements,
                          onDelete,
                          onEdit,
                          onSetActive,
                          onSetInactive,
                        }: Props) {
  const [selected, setSelected] = useState<readonly Advertisment[]>([]);
  const companyNames = useMemo(() => {
    const companyNames = new Map<string, string>();
    companies.forEach((company) => {
      companyNames.set(company.id, company.name);
    });
    return companyNames;
  }, [companies]);
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    rowPageOptions,
  } = usePagination(4);

  const visibleRows = useMemo(
    () => {
      const pageStart = page * rowsPerPage;
      const pageEnd = pageStart + rowsPerPage;
      return advertisements.slice(pageStart, pageEnd);
    },
    [page, rowsPerPage],
  );
  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(advertisements);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, element: Advertisment) => {
    const selectedIndex = selected.indexOf(element);
    let newSelected: readonly Advertisment[] = [];

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
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - advertisements.length);


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
              rowCount={advertisements.length}
            />
            <TableBody>
              {
                visibleRows.map((row, index) => {
                  const isSelected = selected.indexOf(row) !== -1;
                  return <RowBody row={{
                    ...row,
                    companyName: row.companyId? companyNames.get(row.companyId) || '' : '',
                  }} index={index} isSelected={isSelected} onSelect={handleClick} />;
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
          count={advertisements.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </ModuleBase>
  );
}
