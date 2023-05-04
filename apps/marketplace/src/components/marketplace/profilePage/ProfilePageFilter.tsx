import { useState } from 'react';
import SearchBar from '@inc/ui/lib/components/SearchBar';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ProfilePageFilter = () => {

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const handleFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const handleSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };


  return (
  <Box
    display='flex' 
    justifyContent='center' 
    alignItems='center'  
    width='60%'
    sx={{ flexGrow: 1,}}>
    <SearchBar/>
    

    <Typography
      noWrap
      fontSize={10}
      color='#FFFFF'
    >
      Filter:
    </Typography>

    <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filter}
        onChange={handleFilter}
        sx={{
            color: '#212121',
            width: '7rem',
            height:'1.5rem',
            marginLeft: '1rem',
            marginRight: '1rem',
            fontSize: '10px',
          }}
    >
      <MenuItem value={1} sx={{fontSize: '10px',}}>All Listings</MenuItem>
      <MenuItem value={2} sx={{fontSize: '10px',}}>Buying</MenuItem>
      <MenuItem value={3} sx={{fontSize: '10px',}}>Selling</MenuItem>
    </Select>

    <Typography
      noWrap
      fontSize={10}
      color='#FFFFF'

    >
      Sort:
    </Typography>

    <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sort}
        onChange={handleSort}
        sx={{
            color: '#212121',
            width: '7rem',
            height:'1.5rem',
            marginLeft: '1rem',
            marginRight: '1rem',
            fontSize: '10px',
          }}
    >
      <MenuItem value={1} sx={{fontSize: '10px',}}>Newest</MenuItem>
      <MenuItem value={2} sx={{fontSize: '10px',}}>Oldest</MenuItem>
    </Select>

  </Box>
  )
}

export default ProfilePageFilter;