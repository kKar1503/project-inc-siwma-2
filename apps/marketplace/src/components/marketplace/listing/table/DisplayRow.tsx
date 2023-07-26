// ** React Imports
import React, { useMemo } from 'react';

// ** MUI Imports
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

// ** Hooks Imports
import { useResponsiveness } from '@inc/ui';

// ** Store Imports
import useProductStore from '@/stores/products';
import { useTableSelection } from '@/stores/table';

// ** Types Imports
import type { Listing } from '@/utils/api/server/zod/listingTable';
import type { SxProps } from '@mui/material/styles';

// ** Custom Components Imports
import CollapseCell from './CollapseCell';
import DateCell from './DateCell';
import ActionCell from './ActionCell';
import ListingBadge from './ListingBadge';

// ** DisplayRow Props
export interface DisplayRowProps {
  row: Listing;
  rowOpened: string;
  isProductFetching: boolean;
  handleCollapseCell: (rowId: string) => void;
}

const DisplayRow = (props: DisplayRowProps) => {
  // ** Props
  const { row, rowOpened, isProductFetching, handleCollapseCell } = props;

  // ** Hooks
  const [isSm] = useResponsiveness(['sm']);

  // ** Stores
  const products = useProductStore((state) => state.products);
  const [selections] = useTableSelection();

  // ** Styles
  const rowSelectedStyles = useMemo<SxProps>(() => {
    if (selections.indexOf(row.id) !== -1)
      return {
        backgroundColor: alpha('#E7EEF9', 0.9),
      };
    return {};
  }, [selections, row]);

  return (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...rowSelectedStyles }}
    >
      <CollapseCell open={rowOpened === row.id} onChange={() => handleCollapseCell(row.id)} />
      <TableCell
        key={row.id}
        component="th"
        scope="row"
        sx={{
          minWidth: 190,
          width: 516,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {
          /* eslint-disable-next-line no-nested-ternary */
          isProductFetching ? (
            <Skeleton variant="text" />
          ) : products[row.product] === undefined ? (
            'Product name not found'
          ) : (
            products[row.product].name
          )
        }
      </TableCell>
      <TableCell key={row.id} align="center" sx={{ minWidth: 110 }}>
        {row.price}
      </TableCell>
      <TableCell key={row.id} align="center" sx={{ minWidth: 120 }}>
        {row.quantity}
      </TableCell>
      <TableCell key={row.id} align="center" sx={{ minWidth: 180, width: 180 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <ListingBadge type={row.type === 'BUY' ? 'buy' : 'sell'} />{' '}
          {row.negotiable ? <ListingBadge type="negotiable" /> : null}
        </Box>
      </TableCell>
      <DateCell isoDateString={row.createdAt} />
      <ActionCell
        key={row.id}
        listingId={row.id}
        sx={{ width: isSm ? 66 : 170, minWidth: isSm ? 66 : 170 }}
      />
    </TableRow>
  );
};

export default DisplayRow;
