// ** React Imports
import React from 'react';

// ** Mui Imports
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

// ** Store Imports
import { useTableSort } from '@/stores/table';

// ** Types Imports
import type { TSortableField } from '@/utils/api/server/zod/listingTable';
import type { ReactNode } from 'react';

// ** Prop Types
export interface HeaderCellProps {
  children: ReactNode;
  sortByValue?: TSortableField;
  sortable?: boolean;
}

const HeaderCell = (props: HeaderCellProps) => {
  // ** Props
  const { children, sortByValue, sortable } = props;

  // ** Store
  const [sortStates, sortActions] = useTableSort();
  const { sortBy, sortDirection } = sortStates;

  // ** Vars
  const isCurrentSort = sortable && sortByValue === sortBy;

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
      align="left"
      padding="normal"
      sortDirection={isCurrentSort ? sortDirection : false}
      sx={{ WebkitUserSelect: 'none', msUserSelect: 'none', userSelect: 'none' }}
    >
      {sortable ? (
        <TableSortLabel
          active={isCurrentSort}
          direction={isCurrentSort ? sortDirection : 'asc'}
          onClick={() => handleSort()}
        >
          {children}
        </TableSortLabel>
      ) : (
        children
      )}
    </TableCell>
  );
};

export default HeaderCell;
