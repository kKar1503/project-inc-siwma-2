import React, { useState } from 'react';
import CategoryForm, { CategoryProps } from '@/components/marketplace/createListing/CategoryForm';
import { useQuery } from 'react-query';
import fetchCategories from '@/middlewares/fetchCategories';
import useParameter from '@/components/marketplace/createListing/useParameter';


const useGetCategoriesQuery = () => {
  const { data } = useQuery('categories', () => fetchCategories());

  return data;
};

const useCategory = () => {
  const categoriesData = useGetCategoriesQuery();
  const [category, setCategory] = useState<CategoryProps | null>(null);

  const [categoryError, setCategoryError] = useState<string>('');

  const categoryForm = categoriesData && <CategoryForm
    setCategory={setCategory}
    data={categoriesData}
    error={categoryError} />;

  const resetCategoryErrors = () => {
    setCategoryError('');
  };

  const categoryValidation = () => {
    if (category && category.id) return true;
    setCategoryError('Category is required');
    return false;
  };

  const categoryData = {
    categoryId: category?.id || '',
  };

  return {
    categoryForm,
    categoryData,
    categoryValidation,
    resetCategoryErrors,
    parameters:useParameter(category),
  };

};

export default useCategory;
