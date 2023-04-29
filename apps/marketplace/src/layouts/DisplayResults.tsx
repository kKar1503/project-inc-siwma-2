import * as Mui from '@mui/material';
import baseTheme from '../themes/baseTheme';
import ProductListingItem from '../components/marketplace/listing/ProductListingItem';

const DisplayResults = () => {
  return (
    <Mui.ThemeProvider theme={baseTheme}>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={4} md={2}>
          {/* Filter Form */}
          <Mui.FormControl sx={{ p: 1 }}>
            <Mui.Divider sx={{ my: 2 }} />
            <Mui.FormLabel sx={{ fontWeight: 600 }}>Filter</Mui.FormLabel>
            <Mui.Select sx={{ height: '45px' }}>
              <Mui.MenuItem value={1}>1</Mui.MenuItem>
            </Mui.Select>

            <Mui.Divider sx={{ my: 2 }} />
            <Mui.FormLabel sx={{ fontWeight: 600 }}>Sort by</Mui.FormLabel>
            <Mui.Select sx={{ height: '45px' }}>
              <Mui.MenuItem value={1}>1</Mui.MenuItem>
            </Mui.Select>

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
        <Mui.Grid item xs={8} md={10}>
          {/* <Results /> */}
        </Mui.Grid>
      </Mui.Grid>
    </Mui.ThemeProvider>
  );
};

export default DisplayResults;
