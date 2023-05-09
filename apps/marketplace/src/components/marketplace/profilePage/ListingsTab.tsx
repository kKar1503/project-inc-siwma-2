import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SelectComponent } from '@inc/ui';

// pass filter values to select component
const filterValues = ['All Listings', 'Buy Listings', 'Sell Listings'];
const sortValues = ['Best Match', 'Recent', 'Price - High to Low', 'Price - Low to High'];

const ListingsTab = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const handleFilterData = (filter: string) => {
    setFilter(filter);
  };

  const handleSortData = (sort: string) => {
    setSort(sort);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* search bar component goes here */}
      {/* Select Components */}
      <Box sx={{ display: 'flex', ml: 'auto' }}>
        <Box sx={({ spacing }) => ({ display: 'flex', alignItems: 'center', mr: spacing(2) })}>
          <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
            Filter:
          </Typography>
          <SelectComponent onData={handleFilterData} values={filterValues} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
            Sort By:
          </Typography>
          <SelectComponent onData={handleSortData} values={sortValues} />
        </Box>
      </Box>
    </Box>
  );
};

export default ListingsTab;
