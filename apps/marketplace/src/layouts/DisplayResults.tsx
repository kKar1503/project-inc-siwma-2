import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
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

export interface UserBookmarksProps {
  title: string;
  noOfItems: number;
}

export type DisplayResultsProps = {
  children?: React.ReactNode;
  filter: boolean;
  data: UserBookmarksProps;
};

const DisplayResults = ({ children, filter, data }: DisplayResultsProps) => {
  const Theme = useTheme();
  const isMediumScreen = useMediaQuery(Theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sort, setSort] = useState<SortProps>('Recent');
  const [category, setCategory] = useState<string>('');
  const [negotiation, setNegotiation] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Grid item sm={12} md={12} display="flex" justifyContent="center">
      {filter && (
        <Grid
          item
          xs={12}
          md={2}
          sx={({ spacing }) => ({
            width: '100%',
            mt: spacing(4),
            mr: spacing(3),
          })}
        >
          <FilterForm
            setSort={setSort}
            setCategory={setCategory}
            setNegotiation={setNegotiation}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </Grid>
      )}

      <Grid item sm={12} md={10} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <Grid item xs={10} md={8} container justifyContent="flex-start">
            <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
              <Typography sx={{ fontWeight: 500 }} variant="h3">
                {data.title} Bookmarks
              </Typography>
              <Typography variant="h5">
                {data?.noOfItems} {data.title}
              </Typography>
            </Grid>
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
                    setSort={setSort}
                    setCategory={setCategory}
                    setNegotiation={setNegotiation}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                  />
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
