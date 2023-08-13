import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CategoryResponseBody } from '@/utils/api/client/zod/categories';
import fetchCategories from '@/services/fetchCategories';
import { useRouter } from 'next/router';
import CategoryCard from '@/components/marketplace/listing/Categories';
import Spinner from '@/components/fallbacks/Spinner';
import { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import CategoryCardSkeleton from '@/components/marketplace/listing/CategoryCardSkeleton';

export type CategoryPageType = {
  data: CategoryResponseBody[];
};

const useCategoryPageQuery = () => {
  const { data, error, isError, isFetched } = useQuery('cat', async () => fetchCategories());
  return { data, error, isError, isFetched };
};

const CategoriesPage = () => {
  const router = useRouter();
  const catData = useCategoryPageQuery();

  useEffect(() => {
    if (!catData.isFetched) {
      return;
    }

    if (catData.isError) {
      if ('status' in (catData.error as any) && (catData.error as any).status === 404) {
        router.replace('/404');
        return;
      }

      router.replace('/500');
      return;
    }

    if (catData === undefined) {
      router.replace('/500');
    }
  }, [catData.isFetched]);

  if (!catData.isFetched) {
    return <Spinner />;
  }

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
          {catData?.data?.map((category) => (
            <Grid item xl={2} lg={3} md={4} sm={6} xs={6} key={category.name}>
              <CategoryCard {...category} />
            </Grid>
          ))}

          {
            // Skeleton loading
            (catData?.data && catData.data.length === 0) ??
              Array.from({ length: 6 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid item xl={2} lg={3} md={4} xs={6} key={`skele-${index}`}>
                  <CategoryCardSkeleton />
                </Grid>
              ))
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
