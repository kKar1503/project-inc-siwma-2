import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import useResponsiveness from '../hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';

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
    paddingLeft: '4rem',
    fontSize: '13px',
    color: '#424242',
  },
  width: '96%',
}));

const SearchBar = () => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, shape, shadows, palette, typography } = useTheme();
  const searchBarStyles = useMemo(() => {
    if (isSm) {
      return {
        search: {
          width: '100%',
          mr: spacing(1),
          ml: spacing(3),
        },
        searchPlaceholder: {
          fontSize: '0.2rem',
          '&::placeholder': {
            fontSize: '16px',
          },
        },
      };
    }
    if (isMd) {
      return {
        search: {
          width: '33%',
        },
        searchPlaceholder: {
          fontSize: '0.2rem',
          '&::placeholder': {
            fontSize: '0.2rem',
          },
        },
      };
    }
    if (isLg) {
      return {
        search: {
          width: '40%',
        },
        searchPlaceholder: {
          fontSize: '0.2rem',
          '&::placeholder': {
            fontSize: '0.2rem',
          },
        },
      };
    }
    return {};
  }, [isSm, isMd, isLg]);

  return (
    <Search sx={searchBarStyles?.search}>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: 'white', fontSize: '16px' }} />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search for listings…" sx={searchBarStyles?.searchPlaceholder} />
    </Search>
  );
};

export default SearchBar;
