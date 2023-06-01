import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import ListingBookmarks from '@/components/marketplace/bookmarks/listingBookmarks';
import UserBookmarks from '@/components/marketplace/bookmarks/userBookmarks';
import CompanyBookmarks from '@/components/marketplace/bookmarks/companyBookmarks';

export type BookmarkTypeProps = 'LISTINGS' | 'USERS' | 'COMPANIES';

const Bookmarks = () => {
  const [selectedButton, setSelectedButton] = useState('LISTINGS');

  const handleButtonClick = (type: BookmarkTypeProps) => {
    setSelectedButton(type);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} display="flex" justifyContent="center">
          <Grid item xs={4} md={4}>
            <Button
              size="large"
              variant={selectedButton === 'LISTINGS' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('LISTINGS')}
              fullWidth
            >
              LISTINGS
            </Button>
          </Grid>
          <Grid item xs={4} md={4}>
            <Button
              size="large"
              variant={selectedButton === 'USERS' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('USERS')}
              fullWidth
            >
              USERS
            </Button>
          </Grid>
          <Grid item xs={4} md={4}>
            <Button
              size="large"
              variant={selectedButton === 'COMPANIES' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('COMPANIES')}
              fullWidth
            >
              COMPANIES
            </Button>
          </Grid>
        </Grid>
        {selectedButton === 'LISTINGS' && <ListingBookmarks />}
        {selectedButton === 'USERS' && <UserBookmarks />}
        {selectedButton === 'COMPANIES' && <CompanyBookmarks />}
      </Grid>
    </Container>
  );
};

export default Bookmarks;
