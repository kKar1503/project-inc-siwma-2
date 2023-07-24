import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { InstantSearch, connectSearchBox, connectHits } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILI_URL!,
  process.env.NEXT_PUBLIC_MEILI_MASTER_KEY
);

// Debounce hook
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom SearchBox widget
const SearchBox = ({
  currentRefinement,
  refine,
}: {
  currentRefinement: string;
  refine: (s: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(currentRefinement);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refine(debouncedSearchTerm);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      refine(debouncedSearchTerm);
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [debouncedSearchTerm, refine]);

  const onSearchStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={inputValue}
        onChange={onSearchStateChange}
        placeholder="Search"
        fullWidth
        type="submit"
        title="Search"
        InputProps={{
          type: 'search',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <React.Fragment>
              {loading ? (
                <Box display="flex" alignItems="center" sx={{ marginLeft: 1 }}>
                  {' '}
                  <CircularProgress color="inherit" size={20} />
                </Box>
              ) : null}
            </React.Fragment>
          ),
        }}
        sx={{
          position: 'absolute',
          zIndex: 10000,
          width: {
            xs: '80%',
            sm: '80%',
            md: '93%',
            lg: '95%',
          },
          marginTop: {
            xs: '-15px',
            sm: '-15px',
            md: '-17px',
            lg: '-17px',
          },
          marginLeft: {
            xs: '10px',
            sm: '20px',
            md: '0px',
            lg: '0px',
          },
          input: {
            height: '15px',
            padding: '10px 0px 10px 0px',
          },
        }}
      />
    </form>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

// Custom Hits widget
interface Hit {
  objectID: string;
  name: string;
}

const Hits = ({ hits }: { hits: Hit[] }) => (
  <Box
    sx={{
      position: 'absolute',
      zIndex: 10000,
      backgroundColor: 'white',
      padding: '0px 8px 0px 8px',
      width: {
        xs: '80%',
        sm: '80%',
        md: '93%',
        lg: '95%',
      },
      marginTop: '20px',
      marginLeft: {
        xs: '10px',
        sm: '20px',
        md: '0px',
        lg: '0px',
      },
    }}
  >
    {hits.map((hit) => (
      <Box
        component="p"
        key={hit.objectID}
        sx={{
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'lightgrey',
          },
          transition: 'all 0.3s ease',
          padding: '5px',
        }}
      >
        {hit.name}
      </Box>
    ))}
  </Box>
);

const CustomHits = connectHits(Hits);

const SearchBar = () => (
  <InstantSearch searchClient={searchClient} indexName="listings">
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CustomSearchBox />
      <CustomHits />
    </Box>
  </InstantSearch>
);

export default SearchBar;
