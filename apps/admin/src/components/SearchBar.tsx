import { Input, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Input
      placeholder="Search..."
      type="text"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon
            sx={{
              color: 'gray',
            }}
          />
        </InputAdornment>
      }
    />
  </Box>
);

export default SearchBar;
