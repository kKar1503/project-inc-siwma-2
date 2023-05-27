/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { Box, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSession, getSession } from 'next-auth/react';
import { useQuery } from 'react-query';

import Carousel, { Image } from '@/components/marketplace/carousel/AdvertisementCarousel';
import ListingStream from '@/components/marketplace/listing/ListingStream';
import ProductListingItem, { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';


import fetchCategories from '@/middlewares/fetchCategories';
import fetchListings from '@/middlewares/fetchListings';
import fetchAdvertisements from '@/middlewares/fetchAdvertisements';

const mockAdvertisements: Array<Image> = [
  {
    id: '1',
    companyId: '2',
    image:
      'https://i.seadn.io/gcs/files/b7e46c1c3a103a759dcdf56f1b27d7b7.png?auto=format&dpr=1&w=1000',
    active: true,
    startDate: '2023-01-18 13:25:45',
    endDate: '2023-03-18 13:25:45',
    description: 'Advertisement Description',
    link: 'https://example.com',
  },
  {
    id: '2',
    companyId: '3',
    image: 'https://openseauserdata.com/files/102cdad5a88000137aeaa154facb95d8.png',
    active: true,
    startDate: '2023-01-18 13:25:45',
    endDate: '2023-03-18 13:25:45',
    description: 'Advertisement Description',
    link: 'https://example.com',
  },
];

const useGetCategoriesQuery = () => {
  const { data } = useQuery('categories', async () => fetchCategories());

  return data;
};

const useGetListingsQuery = () => {
  const { data } = useQuery('listings', async () => fetchListings());

  return data;
};

const useGetAdvertisementsQuery = () => {
    const { data } = useQuery('advertisements', async () => fetchAdvertisements());

    return data;
}

const Marketplace = () => {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [popularListings, setPopularListings] = React.useState<Array<ProductListingItemProps>>([]);

//   const categories = useGetCategoriesQuery();

  const listings = useGetListingsQuery();

//   const advertisementsData = useGetAdvertisementsQuery();

  return (
    <>
      <Carousel data={mockAdvertisements} />
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
          }}
        >
          <Typography sx={{ fontSize: isMediumScreen ? '22px' : '36px' }}>Categories</Typography>
          <Link href="/" sx={{ fontSize: isMediumScreen ? '22px' : '36px' }}>
            View All Categories
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <Grid container spacing={2} width="80%">
          {/* {categories?.map((category) => {
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={category.name}>
                <CategoryCard {...category} />
              </Grid>
            );
          })} */}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="4em">
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Typography variant="h4">Popular</Typography>
        </Box>
      </Box>
      <ListingStream listingItemsData={listings} />
      <Box display="flex" justifyContent="center" paddingTop="4em">
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Typography variant="h4">Recommended</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <Grid container spacing={2} width="80%">
          {listings?.map((item) => {
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={item.productId}>
                <ProductListingItem data={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Marketplace;
