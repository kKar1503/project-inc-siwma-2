import { Input, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const SearchBarRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (SearchBarRef.current) {
        console.log('here', SearchBarRef.current.value);
        onSearch(SearchBarRef.current.value);
      }
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Input
        inputRef={SearchBarRef}
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
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};
export default SearchBar;