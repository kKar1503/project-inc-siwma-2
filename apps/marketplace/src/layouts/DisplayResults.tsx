import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import baseTheme from '@/themes/baseTheme';
import FilterForm from '@/components/marketplace/FilterForm';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';

export type ResultsProps = {
  items: {
    img: string;
    type: string;
    name: string;
    rating: number;
    href: string;
    price: number;
    negotiable: boolean;
    ownerId: string;
    ownerFullName: string;
    createdAt: string;
    companyName: string;
    isUnitPrice: boolean;
  }[];
};

const DisplayResults = ({ items }: ResultsProps) => {
  const isMediumScreen = useMediaQuery(baseTheme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {!isMediumScreen && (
            <Grid item xs={12} md={2} sx={{ width: '100%', marginTop: 2 }}>
              <FilterForm items={items} />
            </Grid>
          )}

          <Grid item xs={12} md={10} sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', margin: 2 }}>
              <Grid item xs={10} md={8} container justifyContent="flex-start">
                {items ? (
                  <h1 style={{ fontSize: '1.5rem' }}>
                    Displaying {items.length} search results for:{' '}
                  </h1>
                ) : (
                  <h1 style={{ fontSize: '1.5rem' }}>0 search results</h1>
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
                      <FilterForm items={items} />
                    </Box>
                  </Drawer>
                </Grid>
              )}
            </Box>

            {items && items.length > 0 && (
              <Grid container display="flex">
                {items.map((item: any) => (
                  <Grid item xs={4} md={3} sx={{ mb: 2 }}>
                    <ProductListingItem {...item} />
                  </Grid>
                ))}
              </Grid>
            )}

            {!items && (
              <Grid container justifyContent="center">
                <h1>No items found.</h1>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default DisplayResults;
