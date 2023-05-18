/* eslint-disable arrow-body-style */
import React from 'react';
import Carousel, { Image } from '@/components/marketplace/carousel/AdvertisementCarousel';
import ListingStream from '@/components/marketplace/listing/ListingStream';

import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import { Box, Grid, Link, Typography} from '@mui/material';
import CategoryCard, { Category } from '@/components/marketplace/listing/Categories';

const mockListings: Array<ProductListingItemProps> = [
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
  },
  {
    img: 'https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png',
    type: 'NFT',
    name: 'Bored Ape',
    rating: 10,
    href: '',
    price: 20000,
    negotiable: true,
    ownerId: '',
    ownerFullName: 'GYIN',
    createdAt: '22 March 2014',
    companyName: 'SV',
    isUnitPrice: true,
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
          <Typography variant="h4">Categories</Typography>
          <Link href="/" variant="h4">
            View All Categories
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="2em">
        <Grid container spacing={2} width="80%">
          {Categories.map((category) => {
            return (
              <Grid item xs={2}>
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
    </>
  );
};

export default Marketplace;
