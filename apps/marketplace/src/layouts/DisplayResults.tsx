import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterForm, { SortProps } from '@/components/marketplace/filter/FilterForm';
import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';
import { FilterOptions, SortingOptions } from '@/middlewares/fetchListings';

export type DisplayResultsProps = {
  children?: React.ReactNode;
  filter: boolean;
  data?: ProductListingItemProps[] | undefined;
  setFilterOptions?: (filter: FilterOptions) => void;
};

const DisplayResults = ({ children, filter, data, setFilterOptions }: DisplayResultsProps) => {
  const Theme = useTheme();
  const isMediumScreen = useMediaQuery(Theme.breakpoints.down('md'));
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
    <Container maxWidth="xl">
      <Grid container spacing={4} mt={4}>
        {!isMediumScreen && filter ? (
          <Grid
            item
            xs={12}
            md={2}
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
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
        ) : (
          <Grid
            item
            md={1}
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
            })}
          />
        )}

        <Grid item xs={12} md={10} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex' }}>
            <Grid item xs={10} md={8} container justifyContent="flex-start">
              {children}
            </Grid>
            {isMediumScreen && filter && (
              <Grid item xs={2} container justifyContent="flex-end" alignContent="center">
                <Button
                  size="large"
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
                  </Box>
                </Drawer>
              </Grid>
            )}
          </Box>

          {data && data.length > 0 && (
            <Grid container display="flex" spacing={2}>
              {data.map((item: ProductListingItemProps) => (
                <Grid item xs={6} md={4} xl={3} key={item.productId}>
                  <ProductListingItem data={item} />
                </Grid>
              ))}
            </Grid>
          )}

          {data && data.length === 0 && (
            <Grid container justifyContent="center">
              <Typography>No items found.</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DisplayResults;
