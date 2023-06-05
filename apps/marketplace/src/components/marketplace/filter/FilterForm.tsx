import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
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
import { useQuery } from 'react-query';

// middleware
import fetchCategories from '@/middlewares/fetchCategories';

export type SortProps = 'Recent' | 'Price - High to Low' | 'Price - Low to High';

export type FilterFormProps = {
  setSort: (sort: SortProps) => void;
  setCategory: (category: number) => void;
  setNegotiation: (negotiation: boolean) => void;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
};

const useGetCategoriesQuery = () => {
  const { data } = useQuery('categories', () => fetchCategories());

  return data;
};

const FilterForm = ({
  setSort,
  setCategory,
  setNegotiation,
  setMinPrice,
  setMaxPrice,
}: FilterFormProps) => {
  const sortOptions = ['Recent', 'Price - High to Low', 'Price - Low to High'];
  const [sortOption, setSortOption] = useState<SortProps>('Recent');
  const [categoryOption, setCategoryOption] = useState<string>('');
  const [negotiationOption, setNegotiationOption] = useState<string>('');
  const [minPriceOption, setMinPriceOption] = useState<string>('');
  const [maxPriceOption, setMaxPriceOption] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSort(sortOption);
    setCategory(parseInt(categoryOption, 10));
    setNegotiation(negotiationOption === 'negotiable');
    setMinPrice(minPriceOption);
    setMaxPrice(maxPriceOption);
  };

  const categoriesData = useGetCategoriesQuery();

  return (
    <form style={{ padding: 1, marginTop: 2, width: '100%' }} onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Search Filter
      </Typography>
      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Sort By</FormLabel>
      <Select
        sx={{ height: '45px', width: '100%' }}
        onChange={(e) => setSortOption(e.target.value as SortProps)}
        value={sortOption as string}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Category</FormLabel>
      <Select
        sx={{ height: '45px', width: '100%' }}
        onChange={(e) => setCategoryOption(e.target.value)}
        value={categoryOption}
      >
        <MenuItem key={0} value="">
          No Category
        </MenuItem>
        {categoriesData &&
          categoriesData.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>Negotiability</FormLabel>
      <RadioGroup onChange={(e) => setNegotiationOption(e.target.value)}>
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
          onChange={(e) => setMinPriceOption(e.target.value)}
        />
        <TextField
          id="max"
          label="Max"
          variant="standard"
          onChange={(e) => setMaxPriceOption(e.target.value)}
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
