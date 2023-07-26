// ** React Imports
import React from 'react';

// ** Mui Imports
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

// ** Hooks Imports
import { useTranslation } from 'react-i18next';

// ** Store Imports
import { useTableSort } from '@/stores/table';

// ** Types Imports
import type { TSortableField } from '@/utils/api/server/zod/listingTable';

// ** Prop Types
export interface HeaderCellProps {
  i18DisplayText?: string;
  sortByValue?: TSortableField;
  sortable?: boolean;
}

const HeaderCell = (props: HeaderCellProps & TableCellProps) => {
  // ** Props
  const { i18DisplayText, sortByValue, sortable, ...tableCellProps } = props;

  // ** Store
  const [sortStates, sortActions] = useTableSort();
  const { sortBy, sortDirection } = sortStates;

  // ** Vars
  const isCurrentSort = sortable && sortByValue === sortBy;

  // ** Hooks
  const { t } = useTranslation();

  // ** Handlers
  const handleSort = () => {
    if (!sortable) return;

    if (sortByValue === sortBy) {
      sortActions.setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      if (sortDirection !== 'asc') sortActions.setSortDirection('asc');
      if (sortByValue !== undefined) sortActions.setSortBy(sortByValue);
    }
  };

  return (
    <TableCell
      padding="normal"
      sortDirection={isCurrentSort ? sortDirection : false}
      sx={{ WebkitUserSelect: 'none', msUserSelect: 'none', userSelect: 'none' }}
      {...tableCellProps}
    >
      {sortable ? (
        <TableSortLabel
          active={isCurrentSort}
          direction={isCurrentSort ? sortDirection : 'asc'}
          onClick={() => handleSort()}
        >
          {i18DisplayText && t(i18DisplayText)}
        </TableSortLabel>
      ) : (
        i18DisplayText && t(i18DisplayText)
      )}
    </TableCell>
  );
};

export default HeaderCell;
