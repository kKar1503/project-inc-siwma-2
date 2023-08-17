// ** React Imports
import React from 'react';

// ** Mui Imports
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// ** Custom Components Import
import HeaderCell from './HeaderCell';

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <HeaderCell />
      <HeaderCell
        sortByValue="name"
        sortable
        sx={{ minWidth: 190, width: 602 }}
        i18DisplayText="TableListingName"
      />
      <HeaderCell
        align="center"
        sortByValue="price"
        sortable
        sx={{ minWidth: 110 }}
        i18DisplayText="TableListingPrice"
      />
      <HeaderCell
        align="center"
        sortByValue="quantity"
        sortable
        sx={{ minWidth: 120 }}
        i18DisplayText="TableListingQuantity"
      />
      <HeaderCell
        align="center"
        sx={{ minWidth: 180, width: 180 }}
        i18DisplayText="TableListingType"
      />
      <HeaderCell
        align="center"
        sortByValue="createdAt"
        sortable
        sx={{ minWidth: 150, width: 150 }}
        i18DisplayText="TableListingPosted"
      />
      <HeaderCell />
    </TableRow>
  </TableHead>
);

export default TableHeader;
