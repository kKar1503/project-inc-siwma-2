import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { CategoryParametersProps } from './ParameterForm';

export interface CategoryProps {
  id: string;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  active: boolean;
  parameters?: CategoryParametersProps[];
}

export type SetCategoryProps = {
  category?: CategoryProps | null;
  setCategory: (category: CategoryProps | null) => void;
  data: CategoryProps[];
  error: string;
};

const CategoryForm = ({ category, setCategory, data, error }: SetCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null);
  const [validateError, setValidateError] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [error]);

  useEffect(() => {
    if (category) setSelectedCategory(category);
  }, [category]);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const categoryName = e.target.value as string;
    const selectedCategory = data.find((category) => category.name === categoryName) || null;
    setSelectedCategory(selectedCategory);
    setCategory(selectedCategory);
  };

  return (
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <FormControl variant="outlined" error={validateError} fullWidth>
        {error ? (
          <InputLabel>{error}</InputLabel>
        ) : (
          <InputLabel>{t('Select a category...')}</InputLabel>
        )}
        <Select
          value={selectedCategory ? selectedCategory.name : ''}
          label={t('Select a category...')}
          onChange={handleCategoryChange}
          size="medium"
          fullWidth
        >
          {data.map(({ id, name }) => (
            <MenuItem key={id} value={name}>
              {t(name)}
            </MenuItem>
          ))}
        </Select>
        <Divider sx={{ my: 2 }} />
      </FormControl>
    </Grid>
  );
};

export default CategoryForm;
