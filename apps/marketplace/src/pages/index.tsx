import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

import Carousel from '@/components/marketplace/carousel/AdvertisementCarousel';
import CategoryCard from '@/components/marketplace/listing/Categories';

import fetchCategories from '@/middlewares/fetchCategories';
import fetchAdvertisements from '@/middlewares/fetchAdvertisements';

import { useResponsiveness } from '@inc/ui';
import AdvertisementsPlaceholder from '@/components/marketplace/carousel/AdvertisementsPlaceholder';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

// changed all to not refetch on window refocus or reconnect
// this is to prevent constantly making requests
// or updating data that is not supposed to be updated
const useGetCategoriesQuery = () => {
  let { data } = useQuery('categories', async () => fetchCategories(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  data = data?.slice(0, 6);

  return data;
};

const useGetAdvertisementsQuery = (permissions: number | undefined) => {
  const { data } = useQuery(
    ['advertisements', permissions],
    async () => fetchAdvertisements(permissions!),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return data;
};

const Marketplace = () => {
  const { data: session } = useSession();
  const [isSm, isMd, isLg, isXl] = useResponsiveness(['sm', 'md', 'lg', 'xl']);
  const { typography } = useTheme();
  const { t } = useTranslation();

  const categories = useGetCategoriesQuery();
  const advertisementsData = useGetAdvertisementsQuery(session?.user.permissions);

  const headerStyles = useMemo(() => {
    if (isSm) {
      return {
        switchTxt: {
          fontSize: typography.h6,
          zIndex: 99,
        },
      };
    }

    if (isMd) {
      return {
        switchTxt: {
          fontSize: typography.h5,
          fontWeight: 500,
          zIndex: 99,
        },
      };
    }

    if (isLg) {
      return {
        switchTxt: {
          fontSize: typography.h4,
          zIndex: 99,
        },
      };
    }

    return {
      switchTxt: {
        fontSize: '24px',
      },
    };
  }, [isSm, isMd, isLg]);

  return (
    <>
      {advertisementsData?.length ? (
        <Carousel data={advertisementsData} />
      ) : (
        <AdvertisementsPlaceholder />
      )}
      <Box width={isSm ? '90%' : '80%'} margin="auto">
        <Box display="flex" justifyContent="space-between" paddingTop="2em">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography sx={headerStyles?.switchTxt}>{t('Categories')}</Typography>
            <Link href="/categories" sx={headerStyles?.switchTxt}>
              {t('View All Categories')}
            </Link>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" paddingTop="2em" sx={{mb: 4}}>
          <Grid container spacing={2}>
            {categories?.map((category) => (
              <Grid item xl={2} lg={3} md={4} xs={6} key={category.name}>
                <CategoryCard {...category} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Marketplace;
