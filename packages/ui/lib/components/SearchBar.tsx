import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F2F3F4',
  marginRight: '1.5rem',
  marginLeft: '0.5rem',
  width: '33%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius,
  backgroundColor: '#2962FF',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: '4rem',
    // transition: theme.transitions.create('width'),
    
    fontSize: '12px',
    color: '#424242',
  },
  width: '96%',
}));

const SearchBar = () => (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{color: 'white', fontSize: '16px'}}/>
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for listings…"
      />
    </Search>
)

export default SearchBar;