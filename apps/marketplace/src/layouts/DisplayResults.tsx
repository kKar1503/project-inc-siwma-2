import { useMediaQuery, createTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterForm from '@/components/marketplace/filter/FilterForm';
import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';

// create theme
const baseTheme = createTheme();

const DisplayResults = () => {
  const isMediumScreen = useMediaQuery(baseTheme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sort, setSort] = useState<string>('');
  const [negotiation, setNegotiation] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [items, setItems] = useState<ProductListingItemProps[]>([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    // Use the filter
    // Create object
    // Set items
    setItems([]);
  }, [sort, negotiation, minPrice, maxPrice]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {!isMediumScreen && (
          <Grid item xs={12} md={2} sx={{ width: '100%', marginTop: 2 }}>
            <FilterForm
              setSort={setSort}
              setNegotiation={setNegotiation}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          </Grid>
        )}

        <Grid item xs={12} md={10} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', margin: 2 }}>
            <Grid item xs={10} md={8} container justifyContent="flex-start">
              {items ? (
                <Typography variant="h5">Displaying {items.length} search results for: </Typography>
              ) : (
                <Typography variant="h5">Displaying 0 search results for: </Typography>
              )}
            </Grid>
            {isMediumScreen && (
              <Grid item xs={2} container justifyContent="flex-end" alignContent="center">
                <Button
                  sx={{ height: '45px' }}
                  variant="outlined"
                  onClick={toggleDrawer}
                  endIcon={<FilterAltIcon />}
                >
                  FILTER
                </Button>
                <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                  <Box sx={{ height: '100%', margin: 2 }}>
                    <FilterForm
                      setSort={setSort}
                      setNegotiation={setNegotiation}
                      setMinPrice={setMinPrice}
                      setMaxPrice={setMaxPrice}
                    />
                  </Box>
                </Drawer>
              </Grid>
            )}
          </Box>

          {items && items.length > 0 && (
            <Grid container display="flex">
              {items.map((item: ProductListingItemProps) => (
                <Grid item xs={4} md={3} sx={{ mb: 2 }}>
                  <ProductListingItem {...item} />
                </Grid>
              ))}
            </Grid>
          )}

          {items.length === 0 && (
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
