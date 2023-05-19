/* eslint-disable arrow-body-style */
import React from 'react';
import Carousel, { Image } from '@/components/marketplace/carousel/AdvertisementCarousel';
import ListingStream from '@/components/marketplace/listing/ListingStream';

import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';
import { Box, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import CategoryCard, { Category } from '@/components/marketplace/listing/Categories';

const mockListings: Array<ProductListingItemProps> = [
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
  {
    productId: 1,
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    profileImg:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
    isOwnProfile: true,
  },
];

const mockAdvertisements: Array<Image> = [
  {
    id: '1',
    companyId: '1',
    image:
      'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    active: true,
    startDate: '22 March 2023',
    endDate: 1,
    link: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
  },
];

const Categories: Array<Category> = [
  {
    name: 'Angles',
    src: '/images/angles.png',
    href: '/categories/angles',
  },
  {
    name: 'Beams',
    src: '/images/beams.png',
    href: '/categories/beams',
  },
  {
    name: 'Channels',
    src: '/images/channels.png',
    href: '/categories/channels',
  },
  {
    name: 'Gratings',
    src: '/images/gratings.png',
    href: '/categories/gratings',
  },
  {
    name: 'Hollow Section',
    src: '/images/hollow-section.png',
    href: '/categories/hollow-section',
  },
  {
    name: 'Round Bars',
    src: '/images/round-bars.png',
    href: '/categories/round-bars',
  },
];

const Marketplace = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {/* Navbar goes here */}
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
          <Typography sx={{fontSize: isMediumScreen ? '22px': '36px'}}>Categories</Typography>
          <Link href="/" sx={{fontSize: isMediumScreen ? '22px': '36px'}}>
            View All Categories
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <Grid container spacing={2} width="80%">
          {Categories.map((category) => {
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
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
      <ListingStream listingItemsData={mockListings} />
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
          {mockListings.map((item) => {
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
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
