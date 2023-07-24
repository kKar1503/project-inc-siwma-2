import React, { useEffect, useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Box, Button, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import { Product } from '@/utils/api/client/zod/products';
import Link from 'next/link';
import { useQuery } from 'react-query';
import fetchCategories from '@/services/fetchCategories';

type RowData = {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  category: string;
  unit: string;
  chineseUnit: string;
};

type ListingItemsTableProps = Omit<
  React.ComponentProps<typeof BaseTable>,
  'heading' | 'rows' | 'headers' | 'rowsPerPageOptions'
> & {
  data: Product[];
};

const headers: Header[] = [
  {
    key: 'name',
    label: 'Listing Item Name',
  },
  {
    key: 'chineseName',
    label: 'Listing Item Name (Chinese)',
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'category',
    label: 'Category',
  },
  {
    key: 'unit',
    label: 'Unit',
  },
  {
    key: 'chineseUnit',
    label: 'Unit (Chinese)',
  },
];

const parsedListingItemsData = (listingItems: Product[]) => {
  const rows: RowData[] = [];
  const GetCategoryPageQuery = () => {
    const { data } = useQuery('cat', async () => fetchCategories());
    return data;
  };
  
  const cat = GetCategoryPageQuery();
  listingItems.forEach((product) => {
    let catName = '';
    for (let i = 0; i < (cat?.length as number); i++) {
      if (product.categoryId === cat?.[i].id) {
        catName = cat[i].name
      }
    }
    rows.push({
      id: product.id,
      name: product.name || 'Unamed Product',
      chineseName: product.chineseName || '',
      description: product.description,
      category: catName,
      unit: product.unit,
      chineseUnit: product.chineseUnit || '',
    });
  });

  return rows;
};

const AllListingItemsTable: React.FC<ListingItemsTableProps> = ({ data, ...props }) => (
  <Box
    sx={{
      width: '100%',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      padding: 2,
      marginY: 2,
      backgroundColor: 'white',
    }}
  >
    <Typography variant="h5">Listing Items</Typography>
    <Typography variant="body1">Management of Listing Items</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Link href="/listing/listingItemsForm">
        <Button variant="contained">Create Listing Item</Button>
      </Link>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      {/* <SearchBar onSearch={handleSearch} /> */}
    </Box>

    <BaseTable
      {...props}
      heading=""
      rows={parsedListingItemsData(data)}
      headers={headers}
      rowsPerPageOptions={[5, 10, 25]}
    />
  </Box>
);

export default AllListingItemsTable;
