import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterForm, { SortProps } from '@/components/marketplace/filter/FilterForm';
import { FilterOptions, SortingOptions } from '@/services/searchListings';
import { useResponsiveness } from '@inc/ui';
import { useTranslation } from 'react-i18next';

export interface TitleDisplayText {
  single: string;
  plural: string;
}

export interface HeaderDisplayText {
  title: TitleDisplayText;
  noOfItems: number;
}

export type DisplayResultsProps = {
  children?: React.ReactNode;
  filter: boolean;
  header: HeaderDisplayText;
  subHeader: boolean;
  filterOptions?: FilterOptions;
  setFilterOptions?: (filter: FilterOptions) => void;
  isLoading?: boolean;
};

const getSort = (sort: SortingOptions | undefined): SortProps => {
  switch (sort) {
    case 'recent_newest':
      return 'Recent';
    case 'recent_oldest':
      return 'Oldest';
    case 'price_desc':
      return 'Price - High to Low';
    case 'price_asc':
      return 'Price - Low to High';
    case 'rating_desc':
      return 'Rating - High to Low';
    case 'rating_asc':
      return 'Rating - Low to High';
    case 'popularity_desc':
      return 'Most Popular';
    case 'popularity_asc':
      return 'Least Popular';
    default:
      return 'Recent';
  }
};

const DisplayResults = ({
  children,
  filter,
  header: data,
  subHeader,
  filterOptions,
  setFilterOptions,
  isLoading,
}: DisplayResultsProps) => {
  const [isMd, isSm] = useResponsiveness(['md', 'sm']);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sort, setSort] = useState<SortProps>('Recent');
  const [category, setCategory] = useState<number>(0);
  const [negotiation, setNegotiation] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sortBy: SortingOptions = 'recent_newest';
    switch (sort) {
      case 'Recent':
        sortBy = 'recent_newest';
        break;
      case 'Oldest':
        sortBy = 'recent_oldest';
        break;
      case 'Price - High to Low':
        sortBy = 'price_desc';
        break;
      case 'Price - Low to High':
        sortBy = 'price_asc';
        break;
      case 'Rating - High to Low':
        sortBy = 'rating_desc';
        break;
      case 'Rating - Low to High':
        sortBy = 'rating_asc';
        break;
      case 'Most Popular':
        sortBy = 'popularity_desc';
        break;
      case 'Least Popular':
        sortBy = 'popularity_asc';
        break;
      default:
        break;
    }
    const filterOptions: FilterOptions = {
      sortBy,
      category,
      negotiable: negotiation && negotiation.trim() !== '' ? negotiation === 'true' : undefined,
      minPrice: parseInt(minPrice, 10),
      maxPrice: parseInt(maxPrice, 10),
    };
    if (setFilterOptions) {
      setFilterOptions(filterOptions);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (filterOptions) {
      setSort(getSort(filterOptions.sortBy) || 'Recent');
      setCategory(filterOptions.category || 0);
      setNegotiation(filterOptions.negotiable?.toString() || '');
      setMinPrice(filterOptions.minPrice?.toString() || '');
      setMaxPrice(filterOptions.maxPrice?.toString() || '');
    }
  }, [filterOptions]);

  return (
    <Grid item xs={12} md={12} display="flex">
      {filter && !isMd && !isSm && (
        <Grid
          item
          md={2}
          sx={({ spacing }) => ({
            mt: spacing(2),
            mr: spacing(3),
          })}
        >
          <FilterForm
            sort={sort}
            category={category}
            negotiation={negotiation}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setSort={setSort}
            setCategory={setCategory}
            setNegotiation={setNegotiation}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            handleSubmit={handleSubmit}
          />
        </Grid>
      )}

      <Grid item sm={12} md={filter ? 10 : 12} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <Grid item xs={10} md={8} container justifyContent="flex-start">
            <Grid
              item
              xs={12}
              md={12}
              sx={({ spacing }) => ({
                mb: spacing(2),
              })}
            >
              {subHeader && (
                <Typography
                  sx={({ typography }) => ({
                    fontSize: isSm ? typography.h5 : typography.h4,
                    fontWeight: typography.fontWeightBold,
                  })}
                >
                  {data.title.single} {t('Bookmarks')}
                </Typography>
              )}
              <Typography
                sx={({ typography }) => ({
                  fontSize: isSm ? typography.h6 : typography.h5,
                })}
              >
                {data?.noOfItems > 1 || data?.noOfItems === 0
                  ? `${subHeader ? data?.noOfItems : ''} ${data.title.plural}`
                  : `${subHeader ? data?.noOfItems : ''} ${data.title.single}`}
              </Typography>
            </Grid>
          </Grid>
          {(isMd || isSm) && filter && (
            <Grid item xs={2} md={4} container justifyContent="flex-end" alignContent="center">
              <Button
                size={isSm ? 'small' : 'large'}
                variant="outlined"
                onClick={toggleDrawer}
                endIcon={<FilterAltIcon />}
              >
                {t('Filter')}
              </Button>
              <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                <Box
                  sx={({ spacing }) => ({
                    height: '100%',
                    m: spacing(2),
                  })}
                >
                  <FilterForm
                    sort={sort}
                    category={category}
                    negotiation={negotiation}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setSort={setSort}
                    setCategory={setCategory}
                    setNegotiation={setNegotiation}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    handleSubmit={handleSubmit}
                  />
                  <Button
                    sx={{ width: '100%' }}
                    size="large"
                    color="info"
                    variant="contained"
                    onClick={toggleDrawer}
                  >
                    {t('Close')}
                  </Button>
                </Box>
              </Drawer>
            </Grid>
          )}
        </Box>
        {children}
        {!isLoading && data && data.noOfItems === 0 && (
          <Grid container justifyContent="center">
            <Typography>{t('No items found.')}</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default DisplayResults;
