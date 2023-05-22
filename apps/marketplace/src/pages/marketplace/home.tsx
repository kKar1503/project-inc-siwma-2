/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import Carousel, { Image } from '@/components/marketplace/carousel/AdvertisementCarousel';
import ListingStream from '@/components/marketplace/listing/ListingStream';

import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';
import { Box, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import CategoryCard from '@/components/marketplace/listing/Categories';
import NavBar from '@/components/marketplace/navbar/NavBar';
import { TCategory } from '@/types/category';
import { TListing } from '@/types/listing';

const mockAdvertisements: Array<Image> = [
  {
    id: '1',
    companyId: '2',
    image: 'https://i.seadn.io/gcs/files/b7e46c1c3a103a759dcdf56f1b27d7b7.png?auto=format&dpr=1&w=1000',
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

const Marketplace = () => {
  const [listings, setListings] = React.useState<Array<ProductListingItemProps>>([]);
  const [popularListings, setPopularListings] = React.useState<Array<ProductListingItemProps>>([]);
  const [advertisements, setAdvertisements] = React.useState<Array<Image>>([]);
  const [categories, setCategories] = React.useState<Array<TCategory>>([]);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // const fetchAdvertisements = async () => {
    //   try {
    //     const response = await fetch('/api/v1/advertisement');
    //     const data = await response.json();
    //     console.log(data);
    //     // Handle the data or update state

    //     setAdvertisements(data.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/v1/categories');
        const data = await response.json();

        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };

    const fetchListings = async () => {
      try {
        const response = await fetch('/api/v1/listings');
        const data = await response.json();
        const listingsData: Array<ProductListingItemProps> = [];

        // Change later
        const listings = data.data;

        // Mutate Data to fit ProductListingItemProps
        listings.forEach((listing: TListing) => {
          const newListingsObj = {
            productId: +listing.id,
            img: 'https://www.bloomberglinea.com/resizer/cCYxWuUthcqd7ML4NfAFhu8x1Zg=/1440x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/V22IOSYMMFDQDMMN2WK7U5Y6S4.png',
            profileImg: listing.owner.profilePic!,
            type: listing.type,
            name: listing.name,
            rating: listing.rating,
            price: listing.price,
            negotiable: listing.negotiable,
            ownerId: listing.owner.id,
            ownerFullName: listing.owner.name,
            createdAt: listing.createdAt,
            companyName: listing.owner.company.name,
            isUnitPrice: listing.unitPrice,
            isOwnProfile: true,
          };

          listingsData.push(newListingsObj);
        });

        setListings(listingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Advertisements API not created yet
    // fetchAdvertisements();
    fetchListings();
    fetchCategories();
  }, []);

  return (
    <>
      <NavBar />
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
          {categories.map((category) => {
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={category.name}>
                <CategoryCard {...category} />
              </Grid>
            );
          })}
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
          {listings.map((item) => {
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
