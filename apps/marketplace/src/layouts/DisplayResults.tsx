import * as Mui from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import { useState } from 'react';
import baseTheme from '../themes/baseTheme';
import FilterForm from '../components/marketplace/FilterForm';
import ProductListingItem from '../components/marketplace/listing/ProductListingItem';

export type ResultsProps = {
  items: any[];
};

const DisplayResults = ({ items }: ResultsProps) => {
  const isMediumScreen = Mui.useMediaQuery(baseTheme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Mui.ThemeProvider theme={baseTheme}>
      <Mui.CssBaseline />
      <Mui.Container maxWidth="lg">
        <Mui.Grid container spacing={2}>
          {!isMediumScreen && (
            <Mui.Grid item xs={12} md={2} sx={{ width: '100%' }}>
              <FilterForm />
            </Mui.Grid>
          )}

          <Mui.Grid item xs={12} md={10} sx={{ width: '100%' }}>
            <div style={{ display: 'flex', margin: 2 }}>
              <Mui.Grid item xs={6} md={8} container justifyContent="flex-start">
                {items ? (
                  <h1 style={{ fontSize: '1.5rem' }}>
                    Displaying {items.length} search results for:{' '}
                  </h1>
                ) : (
                  <h1 style={{ fontSize: '1.5rem' }}>0 search results</h1>
                )}
              </Mui.Grid>
              <Mui.Grid
                item
                xs={3}
                md={4}
                container
                justifyContent="flex-end"
                alignContent="center"
              >
                <Mui.FormLabel sx={{ pt: 1, pr: 1 }}>Sort By: </Mui.FormLabel>
                <Mui.Select sx={{ height: '45px', width: '40%' }}>
                  <Mui.MenuItem value={1}>idk</Mui.MenuItem>
                </Mui.Select>
              </Mui.Grid>
              {isMediumScreen && (
                <Mui.Grid item xs={3} container justifyContent="flex-end" alignContent="center">
                  <Mui.Button
                    sx={{ height: '45px' }}
                    variant="outlined"
                    onClick={toggleDrawer}
                    endIcon={<MuiIcon.FilterAlt />}
                  >
                    FILTER
                  </Mui.Button>
                  <Mui.Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                    <FilterForm />
                  </Mui.Drawer>
                </Mui.Grid>
              )}
            </div>

            {items && items.length > 0 && (
              <Mui.Grid container display="flex">
                {items.map((item: any) => (
                  <Mui.Grid item xs={4} md={3} sx={{ mb: 2 }}>
                    <ProductListingItem
                      img={item.img}
                      type={item.type}
                      href={item.link}
                      price={item.price}
                      name={item.name}
                      rating={item.rating}
                      negotiable={item.negotiable}
                      ownerFullName={item.ownerFullName}
                      ownerId={item.userId}
                      companyName={item.companyName}
                      isUnitPrice={item.isUnitPrice}
                      createdAt={item.createdAt}
                    />
                  </Mui.Grid>
                ))}
              </Mui.Grid>
            )}

            {!items && (
              <Mui.Grid container justifyContent="center">
                <h1>No items found.</h1>
              </Mui.Grid>
            )}
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Container>
    </Mui.ThemeProvider>
  );
};

export default DisplayResults;
