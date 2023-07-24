// ** React Imports
import React from 'react';

// ** Mui Imports
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

// ** Store Imports
import { useTableSort } from '@/stores/table';

// ** Types Imports
import type { TSortableField } from '@/utils/api/server/zod/listingTable';

// ** Prop Types
export interface HeaderCellProps {
  displayText: string;
  sortByValue: TSortableField;
  sortable?: boolean;
}

const HeaderCell = (props: HeaderCellProps) => {
  // ** Props
  const { displayText, sortByValue, sortable } = props;

  // ** Store
  const [sortStates, sortActions] = useTableSort();
  const { sortBy, sortDirection } = sortStates;

  // ** Vars
  const isCurrentSort = sortable && sortByValue === sortBy;

  // ** Handlers
  const handleSort = () => {
    if (!sortable) {
      return;
    }
    if (sortByValue === sortBy) {
      sortActions.setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      if (sortDirection !== 'asc') {
        sortActions.setSortDirection('asc');
      }
      sortActions.setSortBy(sortByValue);
    }
  };

  return (
    <TableCell align="left" padding="normal" sortDirection={isCurrentSort ? sortDirection : false}>
      <TableSortLabel
        active={isCurrentSort}
        direction={isCurrentSort ? sortDirection : 'asc'}
        onClick={() => handleSort()}
      >
        {displayText}
      </TableSortLabel>
    </TableCell>
  );
};

export default HeaderCell;
