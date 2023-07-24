// ** React Imports
import React, { useEffect } from 'react';

// ** Mui Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// ** Hooks Imports
import { useTranslation } from 'react-i18next';

// ** Store Imports
import useProductStore from '@/stores/products';
import useParamStore from '@/stores/parameters';
import {
  useTableMode,
  useTablePagination,
  useTableSelection,
  useTableStates,
} from '@/stores/table';

// ** Type Imports
import type { Listing } from '@/utils/api/server/zod/listingTable';

// ** Custom Components Imports
import TableHeader from './table/TableHeader';
import TablePagination from './table/TablePagination';
import ListingBadge from './table/ListingBadge';

// ** ListingTable Props Types
export type ListingTableProps = {
  listings: Listing[];
};

/**
 * ListingTable components that is used to generate listings in the new table
 * format instead of the old format with the listing cards.
 * The data passed into the table is stored and mutated directly in the zustand listing
 * and product store. So the data should be accessible in other pages.
 * There should no product data passing between the listing component or any containing
 * page component as the product data should be re-usable across pages, however,
 * we should be refreshing cache based on a table value that mentions that new listings
 * or new products changes are made.
 */
const ListingTable = (props: ListingTableProps) => {
  // ** Props
  const { listings } = props;

  // ** States

  // ** Hooks
  const { t } = useTranslation();
  const [products, productInitializeTime, productActions] = useProductStore((state) => {
    const { products, initialized, ...actions } = state;
    return [state.products, state.initialized, actions];
  });
  const [params, paramInitializeTime, paramActions] = useParamStore((state) => {
    const { params, initialized, ...actions } = state;
    return [state.params, state.initialized, actions];
  });
  const [mode, modeActions] = useTableMode();
  const [tableStates, stateActions] = useTableStates();
  const [pagination, setPagination] = useTablePagination();
  const [selected, selectionActions] = useTableSelection();

  // ** Effects
  useEffect(() => {
    console.log('products');
  }, [products]);

  useEffect(() => {
    console.log('product initialized');
  }, [productInitializeTime]);

  useEffect(() => {
    console.log('product actions');
  }, [productActions]);

  useEffect(() => {
    console.log('params');
  }, [params]);

  useEffect(() => {
    console.log('params initialized');
  }, [paramInitializeTime]);

  useEffect(() => {
    console.log('params actions');
  }, [paramActions]);

  useEffect(() => {
    console.log(listings);
  }, [listings]);

  return (
    <>
      <h1>Hello World</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }}>
          <TableHeader />
          <TableBody>
            {listings.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.quantity}</TableCell>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    <ListingBadge type={row.type === 'BUY' ? 'buy' : 'sell'} />{' '}
                    {row.negotiable ? <ListingBadge type="negotiable" /> : null}
                  </Box>
                </TableCell>
                <TableCell align="left">{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination />
    </>
  );
};

export default ListingTable;
