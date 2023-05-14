import React , { useState, SyntheticEvent } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchBar from '@inc/ui/lib/components/SearchBar';

const ProfilePageFilter: React.FC<{
  setFilter: (value: string) => void,
  setSort: (value: string) => void,
}> = ({ setFilter, setSort }) => {

  const filterHandler = (event: SelectChangeEvent<unknown>) => {
    setFilter(event.target.value as string);
  }

  const sortHandler = (event: SelectChangeEvent<unknown>) => {
    setSort(event.target.value as string);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="60%" sx={{ flexGrow: 1 }}>
      <SearchBar />

      <Typography noWrap fontSize={11}>
        Filter:
      </Typography>

      <Select
        onChange={filterHandler}
        sx={{
          color: '#212121',
          width: '7rem',
          height: '1.5rem',
          marginLeft: '1rem',
          marginRight: '1rem',
          fontSize: '10px',
        }}
      >
        <MenuItem value="All Listings" sx={{ fontSize: '10px' }}>
          All Listings
        </MenuItem>
        <MenuItem value="Buying" sx={{ fontSize: '10px' }}>
          Buying
        </MenuItem>
        <MenuItem value="Selling" sx={{ fontSize: '10px' }}>
          Selling
        </MenuItem>
      </Select>

      <Typography noWrap fontSize={11} color="#FFFFF">
        Sort:
      </Typography>

      <Select
        onChange={sortHandler}
        sx={{
          width: '7rem',
          height: '1.5rem',
          marginLeft: '1rem',
          marginRight: '1rem',
        }}
      >
        <MenuItem value="Newest" sx={{ fontSize: '10px' }}>
          Newest
        </MenuItem>
        <MenuItem value="Oldest" sx={{ fontSize: '10px' }}>
          Oldest
        </MenuItem>
      </Select>
    </Box>
  );
};

export default ProfilePageFilter;