import * as Mui from '@mui/material';
import baseTheme from '../themes/baseTheme';
import ProductListingItem from '../components/marketplace/listing/ProductListingItem';

const DisplayResults = ({ items }: { items: any[] }) => {
  return (
    <Mui.ThemeProvider theme={baseTheme}>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12} md={2} sx={{ width: '100%' }}>
          {/* Filter Form */}
          <Mui.FormControl sx={{ p: 1, mt: 2 }}>
            <Mui.Divider sx={{ my: 2 }} />
            <Mui.FormLabel sx={{ fontWeight: 600 }}>Negotiability</Mui.FormLabel>
            <Mui.RadioGroup>
              <Mui.FormControlLabel value="negotiable" control={<Mui.Radio />} label="Negotiable" />
              <Mui.FormControlLabel
                value="non-negotiable"
                control={<Mui.Radio />}
                label="Non-Negotiable"
              />
            </Mui.RadioGroup>
            <Mui.Divider sx={{ my: 2 }} />

            <Mui.FormLabel sx={{ fontWeight: 600 }}>Price</Mui.FormLabel>
            <div style={{ display: 'flex', marginBottom: 2 }}>
              <Mui.TextField
                id="standard-basic min"
                label="Min"
                variant="standard"
                sx={{ mr: 2 }}
              />
              <Mui.TextField id="standard-basic max" label="Max" variant="standard" />
            </div>

            <Mui.Divider sx={{ my: 2 }} />
            <Mui.FormLabel sx={{ fontWeight: 600 }}>Condition</Mui.FormLabel>
            <Mui.Select sx={{ height: '45px' }}>
              <Mui.MenuItem value={1}>1</Mui.MenuItem>
            </Mui.Select>

            <Mui.Divider sx={{ my: 2 }} />
            <Mui.Button variant="contained">APPLY</Mui.Button>
          </Mui.FormControl>
        </Mui.Grid>

        <Mui.Grid item xs={12} md={10} sx={{ width: '100%' }}>
          {/* <Header /> */}
          <div style={{ display: 'flex', margin: 2 }}>
            <Mui.Grid item xs={8} md={8} container justifyContent="flex-start">
              {items ? (
                <h1 style={{ fontSize: '1.5rem' }}>
                  Displaying {items.length} search results for:{' '}
                </h1>
              ) : (
                <h1 style={{ fontSize: '1.5rem' }}>0 search results</h1>
              )}
            </Mui.Grid>
            <Mui.Grid item xs={4} md={4} container justifyContent="flex-end">
              <Mui.FormLabel sx={{ pt: 1, pr: 1 }}>Sort By: </Mui.FormLabel>
              <Mui.Select sx={{ height: '45px' }}>
                <Mui.MenuItem value={1}>WASSSSSSUp</Mui.MenuItem>
              </Mui.Select>
            </Mui.Grid>
          </div>

          {/* <Listing Container /> */}
          {/* code a sample product listing item with sample data */}
          {items && items.length > 0 && (
            <Mui.Grid container display="flex">
              {items.map((item: any) => {
                return (
                  <ProductListingItem
                    img={item.img}
                    type={item.type}
                    href={item.link}
                    price={item.price}
                    name={item.name}
                    rating={item.rating}
                    negotiable={item.negotiable}
                    ownerFullName={item.username}
                    ownerId={item.userId}
                    companyName={item.companyName}
                    isUnitPrice={item.isUnitPrice}
                    createdAt={item.createdAt}
                  />
                );
              })}
            </Mui.Grid>
          )}

          {!items && (
            // just display "No items found"
            <Mui.Grid container justifyContent="center">
              <h1>No items found.</h1>
            </Mui.Grid>
          )}
        </Mui.Grid>
      </Mui.Grid>
    </Mui.ThemeProvider>
  );
};

export default DisplayResults;
