import { Input, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useRef } from 'react';

type SearchBarProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ onChange }: SearchBarProps) => (
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
      onChange={onChange}
    />
  </Box>
);
export default SearchBar;
