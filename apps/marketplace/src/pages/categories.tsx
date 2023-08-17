import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CategoryResponseBody } from '@/utils/api/client/zod/categories';
import fetchCategories from '@/services/fetchCategories';
import { useRouter } from 'next/router';
import CategoryCard from '@/components/marketplace/listing/Categories';
import { useEffect, useMemo } from 'react';
import CategoryCardSkeleton from '@/components/marketplace/listing/CategoryCardSkeleton';
import { SxProps } from '@mui/material/styles';
import { useResponsiveness } from '@inc/ui';
import { useTranslation } from 'react-i18next';
import NoInternetConnection from '@/components/NoInternet';

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
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { t } = useTranslation();

  const maxWidthContainer = useMemo<SxProps>(() => {
    if (!isSm) return { minWidth: 900, px: 'calc(50vw - 656px)', pb: '20px' };
    return {};
  }, [isSm]);

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

  return (
    <Box
      id="categories"
      sx={{
        padding: 10,
        mx: 'auto',
        height: 'full',
        maxHeight: 'xl',
        ...maxWidthContainer,
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
          {t(['Categories'])}
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
            <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={category.name}>
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
      <NoInternetConnection />
    </Box>
  );
};

export default CategoriesPage;
