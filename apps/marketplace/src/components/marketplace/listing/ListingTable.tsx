/* eslint-disable no-nested-ternary */
// ** React Imports
import React, { useEffect, useMemo, useState } from 'react';

// ** Mui Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// ** Other imports
import { useResponsiveness } from '@inc/ui';

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
import type { SxProps } from '@mui/material/styles';

// ** Custom Components Imports
import TableHeader from './table/TableHeader';
import TablePagination from './table/TablePagination';
import SizedSkeletonRows from './table/SizedSkeletonRows';
import DisplayRow from './table/DisplayRow';
import CollapsibleRow from './table/CollapsibleRow';
import AboveHeader from './table/AboveHeader';

// ** ListingTable Props Types
export type ListingTableProps = {
  listings: Listing[];
  isLoading: boolean;
  isProductFetching: boolean;
  isParamFetching: boolean;
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
  const { listings, isLoading, isProductFetching, isParamFetching } = props;

  // ** States
  const [rowOpened, setRowOpened] = useState('');

  // ** Hooks
  const [isSm] = useResponsiveness(['sm']);
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
  const [selected, selectionActions] = useTableSelection();
  const [paginationStates] = useTablePagination();

  // ** Vars
  const { limit } = paginationStates;

  // ** Effects

  // ** Styles
  const tableMaxWidthContainer = useMemo<SxProps>(() => {
    if (!isSm) return { minWidth: 900, px: 'calc(50vw - 656px)' };
    return {};
  }, [isSm]);

  // ** Handlers
  const handleCollapseCell = (rowId: string) => {
    if (rowOpened === rowId) {
      setRowOpened('');
    } else {
      setRowOpened(rowId);
    }
  };

  return (
    <Box sx={{ ...tableMaxWidthContainer, mt: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={2}>
        <AboveHeader header="Listings" listings={listings} />
        <Divider sx={{ opacity: 0.3 }} />
        <TableContainer>
          <Table>
            <TableHeader />
            <TableBody>
              {isLoading ? (
                <SizedSkeletonRows size={limit} />
              ) : (
                listings.map((row) => (
                  <>
                    <DisplayRow
                      row={row}
                      rowOpened={rowOpened}
                      isProductFetching={isProductFetching}
                      handleCollapseCell={handleCollapseCell}
                    />
                    <CollapsibleRow
                      row={row}
                      rowOpened={rowOpened}
                      isProductFetching={isProductFetching}
                      isParamFetching={isParamFetching}
                    />
                  </>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination />
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ListingTable;
