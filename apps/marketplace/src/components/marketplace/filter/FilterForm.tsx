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
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';

// middleware
import fetchCategories from '@/services/fetchCategories';

export type SortProps =
  | 'Recent'
  | 'Oldest'
  | 'Price - High to Low'
  | 'Price - Low to High'
  | 'Rating - High to Low'
  | 'Rating - Low to High'
  | 'Most Popular'
  | 'Least Popular';

export type FilterFormProps = {
  sort: SortProps;
  category: number;
  negotiation: string;
  minPrice: string;
  maxPrice: string;
  setSort: (sort: SortProps) => void;
  setCategory: (category: number) => void;
  setNegotiation: (negotiation: string) => void;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const useGetCategoriesQuery = () => {
  const { data } = useQuery('categories', () => fetchCategories());

  return data;
};

const FilterForm = ({
  sort,
  category,
  negotiation,
  minPrice,
  maxPrice,
  setSort,
  setCategory,
  setNegotiation,
  setMinPrice,
  setMaxPrice,
  handleSubmit,
}: FilterFormProps) => {
  const sortOptions = [
    'Recent',
    'Oldest',
    'Most Popular',
    'Least Popular',
    'Price - High to Low',
    'Price - Low to High',
    'Rating - High to Low',
    'Rating - Low to High',
  ];

  const { t } = useTranslation();

  const categoriesData = useGetCategoriesQuery();

  const resetForm = () => {
    setSort('Recent');

    setNegotiation('');
    setMinPrice('');
    setMaxPrice('');
  };

  const handleNegotiationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === negotiation) {
      setNegotiation('');
      return;
    }
    setNegotiation(event.target.value);
  };

  return (
    <form style={{ padding: 1, width: '100%' }} onSubmit={handleSubmit}>
      <Divider sx={{ my: 2 }} />
      <FormLabel
        sx={({ typography }) => ({
          fontWeight: typography.fontWeightMedium,
        })}
      >
        {t('Sort By')}
      </FormLabel>
      <Select
        sx={{ height: '45px', width: '100%' }}
        onChange={(e) => setSort(e.target.value as SortProps)}
        value={sort}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {t(option)}
          </MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <FormLabel
        sx={({ typography }) => ({
          fontWeight: typography.fontWeightMedium,
        })}
      >
        {t('Category')}
      </FormLabel>
      <Select
        sx={{ height: '45px', width: '100%' }}
        onChange={(e) => setCategory(parseInt(e.target.value, 10))}
        value={category.toString()}
      >
        <MenuItem key={0} value={0}>
          {t('Any Category')}
        </MenuItem>
        {categoriesData &&
          categoriesData.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {t(category.name)}
            </MenuItem>
          ))}
      </Select>

      <Divider sx={{ my: 2 }} />
      <FormLabel sx={{ fontWeight: 600 }}>{t('Negotiability')}</FormLabel>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={negotiation === 'true'}
              onChange={handleNegotiationChange}
              name="negotiable"
              value="true"
            />
          }
          label={t('Negotiable')}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={negotiation === 'false'}
              onChange={handleNegotiationChange}
              name="nonNegotiable"
              value="false"
            />
          }
          label={t('Non Negotiable')}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <FormLabel
        sx={({ typography }) => ({
          fontWeight: typography.fontWeightMedium,
        })}
      >
        {t('Price')}
      </FormLabel>
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField
          id="min"
          label={t('Min')}
          variant="standard"
          type="number"
          sx={{ mr: 2 }}
          onChange={(e) => setMinPrice(e.target.value)}
          value={minPrice}
        />
        <TextField
          id="max"
          label={t('Max')}
          type="number"
          variant="standard"
          onChange={(e) => setMaxPrice(e.target.value)}
          value={maxPrice}
        />
      </Box>

      <Divider sx={{ my: 2 }} />
      <Button variant="contained" type="submit" fullWidth>
        {t('APPLY')}
      </Button>
      <Button
        onClick={resetForm}
        sx={{ my: 2 }}
        variant="contained"
        type="button"
        color="error"
        fullWidth
      >
        {t('RESET')}
      </Button>
    </form>
  );
};

export default FilterForm;
