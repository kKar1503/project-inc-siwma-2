// ** React Imports
import React from 'react';

// ** MUI Imports
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';

// ** Types Imports
import type { Listing } from '@/utils/api/server/zod/listingTable';

// ** CollapsibleRow Props Types
export interface CollapsibleRowProps {
  row: Listing;
  rowOpened: string;
  isProductFetching: boolean;
  isParamFetching: boolean;
}

const CollapsibleRow = (props: CollapsibleRowProps) => {
  // ** Props
  const { row, rowOpened, isProductFetching, isParamFetching } = props;

  return (
    <TableRow>
      <TableCell colSpan={7} sx={{ py: 0 }}>
        <Collapse in={rowOpened === row.id} timeout="auto" unmountOnExit>
          <h1>{JSON.stringify(row.parameters)}</h1>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapsibleRow;
