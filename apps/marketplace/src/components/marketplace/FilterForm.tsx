import * as Mui from '@mui/material';

const FilterForm = () => {
  return (
    <Mui.FormControl sx={{ p: 1, mt: 2 }}>
      <Mui.Divider sx={{ my: 2 }} />
      <Mui.FormLabel sx={{ fontWeight: 600 }}>Negotiability</Mui.FormLabel>
      <Mui.RadioGroup>
        <Mui.FormControlLabel value="negotiable" control={<Mui.Radio />} label="Negotiable" />
        <Mui.FormControlLabel
          value="nonNegotiable"
          control={<Mui.Radio />}
          label="Non-Negotiable"
        />
      </Mui.RadioGroup>
      <Mui.Divider sx={{ my: 2 }} />

      <Mui.FormLabel sx={{ fontWeight: 600 }}>Price</Mui.FormLabel>
      <div style={{ display: 'flex', marginBottom: 2 }}>
        <Mui.TextField id="standard-basic min" label="Min" variant="standard" sx={{ mr: 2 }} />
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
  );
};

export default FilterForm;
