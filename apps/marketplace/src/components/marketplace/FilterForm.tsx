import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const FilterForm = ({
  setSort,
  setNegotiation,
  setMinPrice,
  setMaxPrice,
}: {
  setSort: (sort: string) => void;
  setNegotiation: (negotiation: string) => void;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
}) => {
  const sortOptions = ['Recent', 'Price - High to Low', 'Price - Low to High'];
  const [sortOption, setSortOption] = useState<string>('');
  const [negotiationOption, setNegotiationOption] = useState<string>('');
  const [minPriceOption, setMinPriceOption] = useState<string>('');
  const [maxPriceOption, setMaxPriceOption] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSort(sortOption);
    setNegotiation(negotiationOption);
    setMinPrice(minPriceOption);
    setMaxPrice(maxPriceOption);

    console.log(`Sort: ${sortOption}`);
    console.log(`Negotiation: ${negotiationOption}`);
    console.log(`Min Price: ${minPriceOption}`);
    console.log(`Max Price: ${maxPriceOption}`);
  };

  return (
    <form style={{ padding: 1, marginTop: 2, width: '100%' }} onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Search Filter
      </Typography>
      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Sort By</FormLabel>
      <Select
        sx={{ height: '45px', width: '100%' }}
        onChange={(e: SelectChangeEvent<string>) => setSortOption(e.target.value as string)}
        value={sortOption as string}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Negotiability</FormLabel>
      <RadioGroup
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNegotiationOption(e.target.value)}
      >
        <FormControlLabel value="negotiable" control={<Radio />} label="Negotiable" />
        <FormControlLabel value="nonNegotiable" control={<Radio />} label="Non-Negotiable" />
      </RadioGroup>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Price</FormLabel>
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField
          id="min"
          label="Min"
          variant="standard"
          sx={{ mr: 2 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPriceOption(e.target.value)}
        />
        <TextField
          id="max"
          label="Max"
          variant="standard"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPriceOption(e.target.value)}
        />
      </Box>

      <Divider sx={{ my: 2 }} />
      <Button variant="contained" type="submit" fullWidth>
        APPLY
      </Button>
    </form>
  );
};

export default FilterForm;
