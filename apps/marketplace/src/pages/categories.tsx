import CardActionArea from '@mui/material/CardActionArea';
import { useQuery } from 'react-query';
import { Box, Typography, CardMedia, CardContent, Card, Grid, useTheme } from '@mui/material';
import { CategoryResponseBody } from '@/utils/api/client/zod/categories';
import fetchCategories from '@/services/fetchCategories';
import Link from 'next/link';
import CategoryCard from '@/components/marketplace/listing/Categories';

export type CategoryPageType = {
  data: CategoryResponseBody[];
};

const useCategoryPageQuery = () => {
  const { data } = useQuery('cat', async () => fetchCategories());
  return data;
};

const CategoriesPage = () => {
  const catData = useCategoryPageQuery();
  const theme = useTheme();

  return (
    <Box
      sx={{
        mx: 'auto',
        width: '90%',
        height: 'full',
        maxHeight: 'xl',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography
          sx={({ spacing }) => ({
            py: spacing(3),
            fontSize: { xs: 20, sm: 30, md: 40, lg: 45 },
            fontWeight: 700,
          })}
        >
          More Metal Types
        </Typography>
      </Box>

      <Grid>
        <Grid
          container
          spacing={2}
          sx={{
            direction: 'row',
          }}
        >
          {catData?.map((category) => (
            <Grid item xl={2} lg={3} md={4} sm={6} xs={6} key={category.name}>
              <CategoryCard {...category} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
