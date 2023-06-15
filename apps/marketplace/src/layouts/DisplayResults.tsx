import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterForm, { SortProps } from '@/components/marketplace/filter/FilterForm';
import { FilterOptions, SortingOptions } from '@/middlewares/searchListings';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';

export interface titleProps {
  single: string;
  plural: string;
}

export interface HeaderProps {
  title: titleProps;
  noOfItems: number;
}

export type DisplayResultsProps = {
  children?: React.ReactNode;
  filter: boolean;
  data: HeaderProps;
  subHeader: boolean;
  setFilterOptions?: (filter: FilterOptions) => void;
};

const DisplayResults = ({
  children,
  filter,
  data,
  subHeader,
  setFilterOptions,
}: DisplayResultsProps) => {
  const [isMd, isSm] = useResponsiveness(['md', 'sm']);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sort, setSort] = useState<SortProps>('Recent');
  const [category, setCategory] = useState<number>(0);
  const [negotiation, setNegotiation] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sortBy: SortingOptions = 'recent_newest';
    switch (sort) {
      case 'Recent':
        sortBy = 'recent_newest';
        break;
      case 'Price - High to Low':
        sortBy = 'price_desc';
        break;
      case 'Price - Low to High':
        sortBy = 'price_asc';
        break;
      default:
        break;
    }
    const filterOptions: FilterOptions = {
      sortBy,
      category,
      negotiable: negotiation === 'negotiable',
      minPrice: parseInt(minPrice, 10),
      maxPrice: parseInt(maxPrice, 10),
    };
    if (setFilterOptions) {
      setFilterOptions(filterOptions);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Grid item xs={12} md={12} display="flex">
      {filter && !isMd && !isSm && (
        <Grid
          item
          md={2}
          sx={({ spacing }) => ({
            mt: spacing(2),
            mr: spacing(3),
          })}
        >
          <FilterForm
            sort={sort}
            category={category}
            negotiation={negotiation}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setSort={setSort}
            setCategory={setCategory}
            setNegotiation={setNegotiation}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            handleSubmit={handleSubmit}
          />
        </Grid>
      )}

      <Grid item sm={12} md={filter ? 10 : 12} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <Grid item xs={10} md={8} container justifyContent="flex-start">
            <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 3 }}>
              {subHeader && (
                <Typography variant="h3" fontSize={isSm ? '2rem' : '3rem'} fontWeight="700">
                  {data.title.single} Bookmarks
                </Typography>
              )}
              <Typography variant={isSm ? 'h6' : 'h5'} fontSize={isSm ? '1rem' : '1.5rem'}>
                {data?.noOfItems > 1 && data?.noOfItems !== 0
                  ? `${subHeader ? data?.noOfItems : ''} ${data.title.plural}`
                  : `${subHeader ? data?.noOfItems : ''} ${data.title.single}`}
              </Typography>
            </Grid>
          </Grid>
          {(isMd || isSm) && filter && (
            <Grid item xs={2} md={4} container justifyContent="flex-end" alignContent="center">
              <Button
                size={isSm ? 'small' : 'large'}
                variant="outlined"
                onClick={toggleDrawer}
                endIcon={<FilterAltIcon />}
              >
                FILTER
              </Button>
              <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                <Box
                  sx={({ spacing }) => ({
                    height: '100%',
                    m: spacing(2),
                  })}
                >
                  <FilterForm
                    sort={sort}
                    category={category}
                    negotiation={negotiation}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setSort={setSort}
                    setCategory={setCategory}
                    setNegotiation={setNegotiation}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    handleSubmit={handleSubmit}
                  />
                  <Button
                    sx={{ width: '100%', mt: 2 }}
                    size="large"
                    color="error"
                    variant="contained"
                    onClick={toggleDrawer}
                  >
                    Close
                  </Button>
                </Box>
              </Drawer>
            </Grid>
          )}
        </Box>
        {children}
        {data && data.noOfItems === 0 && (
          <Grid container justifyContent="center">
            <Typography>No items found.</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default DisplayResults;
