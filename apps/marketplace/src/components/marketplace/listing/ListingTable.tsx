// ** React Imports
import React from 'react';

// ** Mui Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ** Type Imports
import type { Listing } from '@/utils/api/client/zod';

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
  // ** Effects

  return (
    <>
      <h1>Hello World</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Listing Name</TableCell>
              <TableCell>Listing Name</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};
