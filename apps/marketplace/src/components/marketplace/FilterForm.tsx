import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export type ListingProps = {
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

const FilterForm = ({ items }: ListingProps) => {
  const conditionOptions = ['Mint', 'Used'];
  const sortOptions = ['Best Match', 'Recent', 'Price - High to Low', 'Price - Low to High'];

  return (
    <form style={{ padding: 1, marginTop: 2, width: '100%' }}>
      <h3 style={{ marginBottom: 0 }}>Search Filter</h3>
      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Sort By</FormLabel>
      <Select sx={{ height: '45px', width: '100%' }}>
        {sortOptions.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Negotiability</FormLabel>
      <RadioGroup>
        <FormControlLabel value="negotiable" control={<Radio />} label="Negotiable" />
        <FormControlLabel value="nonNegotiable" control={<Radio />} label="Non-Negotiable" />
      </RadioGroup>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Price</FormLabel>
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField id="standard-basic min" label="Min" variant="standard" sx={{ mr: 2 }} />
        <TextField id="standard-basic max" label="Max" variant="standard" />
      </Box>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Condition</FormLabel>
      <Select sx={{ height: '45px', width: '100%' }}>
        {conditionOptions.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <Button variant="contained" type="submit" fullWidth>
        APPLY
      </Button>
    </form>
  );
};

export default FilterForm;
