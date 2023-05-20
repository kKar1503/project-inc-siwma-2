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

export type DisplayResultsProps = {
  children?: React.ReactNode;
  filter: boolean;
  data?: ProductListingItemProps[] | undefined;
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
              setSort={setSort}
              setCategory={setCategory}
              setNegotiation={setNegotiation}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
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

          {data && data.length > 0 && (
            <Grid container display="flex" spacing={2}>
              {data.map((item: ProductListingItemProps) => (
                <Grid item xs={4} md={3} key={item.name}>
                  <ProductListingItem {...item} />
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
