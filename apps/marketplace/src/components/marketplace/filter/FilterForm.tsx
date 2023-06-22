import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';

export type SortProps = 'Recent' | 'Price - High to Low' | 'Price - Low to High';

const sortOptions = ['Recent', 'Price - High to Low', 'Price - Low to High'];
export type FilterFormProps = {
  setSort: (sort: SortProps) => void;
  setCategory: (category: string) => void;
  setNegotiation: (negotiation: string) => void;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
};

const FilterForm = ({
  setSort,
  setCategory,
  setNegotiation,
  setMinPrice,
  setMaxPrice,
}: FilterFormProps) => {
  const { t } = useTranslation();
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortProps>('Recent');
  const [categoryOption, setCategoryOption] = useState<string>('');
  const [negotiationOption, setNegotiationOption] = useState<string>('');
  const [minPriceOption, setMinPriceOption] = useState<string>('');
  const [maxPriceOption, setMaxPriceOption] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSort(sortOption);
    setCategory(categoryOption);
    setNegotiation(negotiationOption);
    setMinPrice(minPriceOption);
    setMaxPrice(maxPriceOption);

    console.log(`Sort: ${sortOption}`);
    console.log(`Category: ${categoryOption}`);
    console.log(`Negotiation: ${negotiationOption}`);
    console.log(`Min Price: ${minPriceOption}`);
    console.log(`Max Price: ${maxPriceOption}`);
  };

  useEffect(() => {
    // Get categories from backend
    setCategoryOptions([]);
  }, []);

  return (
    <form style={{ padding: 1, marginTop: 2, width: '100%' }} onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {t('Search Filter')}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>{t('Sort By')}</FormLabel>
      <Select
        sx={{ height: '45px', width: '100%' }}
        onChange={(e) => setSortOption(e.target.value as SortProps)}
        value={sortOption as string}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {t(option)}
          </MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>{t('Category')}</FormLabel>
      <Select
        sx={{ height: '45px', width: '100%' }}
        onChange={(e) => setCategoryOption(e.target.value as string)}
        value={categoryOption as string}
      >
        {categoryOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>{t('Negotiability')}</FormLabel>
      <RadioGroup onChange={(e) => setNegotiationOption(e.target.value)}>
        <FormControlLabel value="negotiable" control={<Radio />} label={t('Negotiable')} />
        <FormControlLabel value="nonNegotiable" control={<Radio />} label={t('Non-Negotiable')} />
      </RadioGroup>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>{t('Price')}</FormLabel>
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField
          id="min"
          label={t('Min')}
          variant="standard"
          sx={{ mr: 2 }}
          onChange={(e) => setMinPriceOption(e.target.value)}
        />
        <TextField
          id="max"
          label={t('Max')}
          variant="standard"
          onChange={(e) => setMaxPriceOption(e.target.value)}
        />
      </Box>

      <Divider sx={{ my: 2 }} />
      <Button variant="contained" type="submit" fullWidth>
        {t('APPLY')}
      </Button>
    </form>
  );
};

export default FilterForm;
