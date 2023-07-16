import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme, Button, TextField, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';

const AdvertisementUpload = () => {
  const theme = useTheme();
  const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  function createData(
    name: string,
    nameChinese: string,
    description: string,
    category: string,
    unit: string,
    unitChinese: string
  ): BaseTableData {
    return {
      id: name,
      name,
      nameChinese,
      description,
      category,
      unit,
      unitChinese,
    };
  }

  const headCells: Header[] = [
    {
      key: 'name',
      label: 'Listing Name',
    },
    {
      key: 'nameChinese',
      label: 'Listing Name (Chinese)',
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
      key: 'unitChinese',
      label: 'Unit (Chinese)',
    },
  ];

  const rows = [
    createData(
      'Iron Beams Metal',
      '梁金属',
      'The beams are in good condition',
      'Beams',
      'Kg',
      '公斤'
    ),
    createData(
      'Iron Hollow Section',
      '铁梁金属',
      'The hollow section are in good condition',
      'Hollow Section',
      'Kg',
      '公斤'
    ),
    createData(
      'Steel Angles',
      '铁角钢',
      'The angles are in good condition',
      'Angles',
      'Kg',
      '公斤'
    ),
    createData(
      'S232 Sheet Piles',
      'S232 钢板柱',
      'The sheet piles are in good condition',
      'Sheet Piles',
      'Kg',
      '公斤'
    ),
    createData(
      'S233 Sheet Piles',
      'S233 钢板柱',
      'The sheet piles are in good condition',
      'Sheet Piles',
      'Kg',
      '公斤'
    ),
    createData(
      'Iron Metal Channels',
      '梁金属',
      'The channels are in good condition',
      'Channels',
      'Kg',
      '公斤'
    ),
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      marginLeft={isSmallOrMediumScreen ? 0 : '300px'}
      sx={{
        mt: '10px',
      }}
    >
      <Box>
        <Button
          variant="contained"
          sx={{ mt: '20px', mr: '30px', ml: '20px', fontSize: '10px', fontWeight: 'bold' }}
        >
          CREATE LISTING NAME
        </Button>

        <TextField
          label="Search Listings..."
          variant="standard"
          sx={{
            width: '200px',
            height: '40px',
            mb: '20px',
            fontSize: '10px',
          }}
        >
          Search Listings ...
        </TextField>
      </Box>

      <Box
        sx={{
          backgroundColor: 'transparent',
          mt: '20px',
          mr: '20px',
          ml: '20px',
        }}
      >
        <BaseTable
          heading="Listing items"
          rows={rows}
          headers={headCells}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDelete={() => console.log('delete')}
          onEdit={() => console.log('edit')}
          onToggle={() => console.log('toggle')}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          totalCount={rows.length}
        />
      </Box>
    </Box>
  );
};

export default AdvertisementUpload;
