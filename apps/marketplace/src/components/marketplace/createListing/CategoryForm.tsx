import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CategoryParametersProps } from './ParameterForm';

export interface CategoryProps {
  id: string;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  active: boolean;
  parameters: CategoryParametersProps[];
}

export type SetCategoryProps = {
  setCategory: (category: CategoryProps | null) => void;
  data: CategoryProps[];
};

const CategoryForm = ({ setCategory, data }: SetCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const categoryName = e.target.value as string;
    const selectedCategory = data.find((category) => category.name === categoryName) || null;
    setSelectedCategory(selectedCategory);
    setCategory(selectedCategory);
  };

  return (
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Select a category...</InputLabel>
        <Select
          value={selectedCategory ? selectedCategory.name : ''}
          onChange={handleCategoryChange}
          size="medium"
          fullWidth
        >
          {data.map(({ id, name }) => (
            <MenuItem key={id} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Divider sx={{ my: 2 }} />
      </FormControl>
    </Grid>
  );
};

export default CategoryForm;
