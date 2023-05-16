import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

export type SetCategoryProps = {
  setCategory: (category: string) => void;
};

const CategoryForm = ({ setCategory }: SetCategoryProps) => {
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    // Get categories from backend
    setCategoryOptions(['all', 'electronics', 'furniture', 'clothing', 'books', 'other']);
  }, []);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value as string);
    setCategory(e.target.value as string);
  };

  return (
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        size="medium"
        label="Select a category..."
        fullWidth
      >
        {categoryOptions.map((category: string) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
      <Divider sx={{ my: 2 }} />
    </Grid>
  );
};

export default CategoryForm;
