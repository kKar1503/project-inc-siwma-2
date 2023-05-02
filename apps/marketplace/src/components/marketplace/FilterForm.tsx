import * as Mui from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const FilterForm = () => {
  return (
    <form style={{ padding: 1, marginTop: 2, width: '100%' }}>
      <h3>Search Filter</h3>
      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Negotiability</FormLabel>
      <RadioGroup>
        <FormControlLabel value="negotiable" control={<Mui.Radio />} label="Negotiable" />
        <FormControlLabel value="nonNegotiable" control={<Radio />} label="Non-Negotiable" />
      </RadioGroup>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Price</FormLabel>
      <div style={{ display: 'flex', marginBottom: 2 }}>
        <TextField id="standard-basic min" label="Min" variant="standard" sx={{ mr: 2 }} />
        <TextField id="standard-basic max" label="Max" variant="standard" />
      </div>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Condition</FormLabel>
      <Select sx={{ height: '45px', width: '100%' }}>
        <MenuItem value={1}>1</MenuItem>
      </Select>

      <Divider sx={{ my: 2 }} />
      <Button variant="contained" type="submit" fullWidth>
        APPLY
      </Button>
    </form>
  );
};

export default FilterForm;
