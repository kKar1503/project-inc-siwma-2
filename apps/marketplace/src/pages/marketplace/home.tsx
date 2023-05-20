/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import Carousel, { Image } from '@/components/marketplace/carousel/AdvertisementCarousel';
import ListingStream from '@/components/marketplace/listing/ListingStream';

import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';
import { Box, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import CategoryCard, { Category } from '@/components/marketplace/listing/Categories';
import NavBar from '@/components/marketplace/navbar/NavBar';

export type TListings = {
  id: string;
  name: string;
  description: string;
  price: number;
  unitPrice: boolean;
  negotiable: boolean;
  categoryId: string;
  type: 'SELL' | 'BUY';
  owner: {
    id: string;
    name: string;
    email: string;
    company: {
      id: string;
      name: string;
      website: string;
      bio: string;
      image: string;
      visible: boolean;
    };
    profilePic: string | null;
    mobileNumber: string;
    contactMethod: string;
    bio: string | null;
  };
  active: boolean;
  parameter: [
    {
      paramId: string;
      value: number;
    },
    {
      paramId: string;
      value: number;
    }
  ];
  createdAt: string;
};

const mockListings: Array<TListings> = [
  {
    id: '1',
    name: 'Aluminium I-Beams',
    description: 'Listing description',
    price: 300,
    unitPrice: false,
    negotiable: true,
    categoryId: '1',
    type: 'SELL',
    owner: {
      id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
      name: 'Elon Musk',
      email: 'elon.musk@example.com',
      company: {
        id: '1',
        name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
        website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
        bio: 'Owner bio',
        image: '',
        visible: true,
      },
      profilePic: null,
      mobileNumber: '69694202',
      contactMethod: 'email',
      bio: null,
    },
    active: true,
    parameter: [
      {
        paramId: '3',
        value: 200,
      },
      {
        paramId: '2',
        value: 300,
      },
    ],
    createdAt: '2023-05-15T18:03:01.036Z',
  },
];

const mockAdvertisements: Array<Image> = [
  {
    id: '1',
    companyId: '1',
    image: '550e8400-e29b-41d4-a716-446655440000.png',
    active: true,
    startDate: '2023-01-18 13:25:45',
    endDate: '2023-03-18 13:25:45',
    description: 'Advertisement Description',
    link: 'https://example.com',
  },
  {
    id: '2',
    companyId: '1',
    image: '550e8400-e29b-41d4-a716-446655440000.png',
    active: true,
    startDate: '2023-01-18 13:25:45',
    endDate: '2023-03-18 13:25:45',
    description: 'Advertisement Description',
    link: 'https://example.com',
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
  const [listings, setListings] = React.useState<Array<ProductListingItemProps>>([]);
  const [popularListings, setPopularListings] = React.useState<Array<ProductListingItemProps>>([]);
  const [advertisements, setAdvertisements] = React.useState<Array<Image>>([]);
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

    const fetchListings = async () => {
      try {
        const response = await fetch('/api/v1/listings');
        const data = await response.json();
        const listingsData: Array<ProductListingItemProps> = [];
        console.log(data);

        // Change later
        const listings = mockListings;

        // Mutate Data to fit ProductListingItemProps
        listings.forEach((listing) => {
          const newListingsObj = {
            productId: +listing.id,
            img: '',
            profileImg: listing.owner.profilePic!,
            type: listing.type,
            name: listing.name,
            rating: +'4',
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

        console.log(listingsData);
        setListings(listingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Advertisements API not created yet
    // fetchAdvertisements();
    fetchListings();
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
          {Categories.map((category) => {
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
