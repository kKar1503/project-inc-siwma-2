import React, { useEffect, useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Box, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import { Listing } from '@/utils/api/client/zod/listings';

type RowData = {
  id: string;
  listingName: string;
  price: number;
  quantity: number;
  type: 'BUY' | 'SELL';
  company: string;
  postedOn: string;
};

type AllListingsTableProps = Omit<
  React.ComponentProps<typeof BaseTable>,
  'heading' | 'rows' | 'headers' | 'rowsPerPageOptions'
> & {
  data: Listing[];
};

const headers: Header[] = [
  {
    key: 'listingName',
    label: 'Listing Name',
  },
  {
    key: 'price',
    label: 'Price ($SGD)',
  },
  {
    key: 'quantity',
    label: 'Quantity',
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'company',
    label: 'Company',
  },
  {
    key: 'postedOn',
    label: 'Posted On',
  },
];

const parsedListingsData = (listings: Listing[]) => {
  const rows: RowData[] = [];
  listings.forEach((listing) => {
    rows.push({
      id: listing.id,
      listingName: listing.name || 'Unamed Product',
      price: listing.price,
      quantity: listing.quantity,
      type: listing.type,
      company: listing.owner.company.name,
      postedOn: listing.createdAt,
    });
  });

  return rows;
};

const AllListingsTable: React.FC<AllListingsTableProps> = ({ data, ...props }) => (
  <Box
    sx={{
      maxHeight: '90%',
      width: '95%',
      margin: 'auto',
    }}
  >
    <BaseTable
      sx={{
        height: '100%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
      }}
      {...props}
      heading=""
      rows={parsedListingsData(data)}
      headers={headers}
      rowsPerPageOptions={[5, 10, 25]}
      placeholderMessage="No listings found"
      customHeader={
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5">Listings</Typography>
          <Typography variant="body1">Management of listings</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {/* <SearchBar onSearch={handleSearch} /> */}
          </Box>
        </Box>
      }
    />
  </Box>
);

export default AllListingsTable;
