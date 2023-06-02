import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import ListingBookmarks from '@/components/marketplace/bookmarks/listingBookmarks';
import UserBookmarks from '@/components/marketplace/bookmarks/userBookmarks';
import CompanyBookmarks from '@/components/marketplace/bookmarks/companyBookmarks';
import fetchUser from '@/middlewares/fetchUser';
import fetchListing from '@/middlewares/fetchListing';
import fetchCompany from '@/middlewares/fetchCompany';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

export type BookmarkTypeProps = 'LISTINGS' | 'USERS' | 'COMPANIES';

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery('user', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });

  return data;
};

const Bookmarks = () => {
  const [selectedButton, setSelectedButton] = useState('LISTINGS');
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const handleButtonClick = (type: BookmarkTypeProps) => {
    setSelectedButton(type);
  };

  const findListings = (listingIDs: string[]) => {
    const listings = [];

    if (listingIDs.length === 0) return;

    listingIDs.forEach(async (id) => {
      const data = await fetchListing(id);

      if (data) {
        console.log(data);
        listings.push(data);
      }
    });
  };

  const findUsers = (userIDs: string[]) => {
    const users = [];

    if (userIDs.length === 0) return;

    userIDs.forEach(async (id) => {
      const data = await fetchUser(id);

      if (data) {
        users.push(data.data);
      }
    });
  };

  const findCompanies = (companyIDs: string[]) => {
    const companies = [];

    if (companyIDs.length === 0) return;

    companyIDs.forEach(async (id) => {
      const data = await fetchCompany(id);

      if (data) {
        companies.push(data);
      }
    });
  };

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const userDetails = useGetUserQuery(loggedUserUuid);
  if (userDetails) {
    const { bookmarks } = userDetails.data.data[0];

    findListings(bookmarks.listings);
    findUsers(bookmarks.users);
    findCompanies(bookmarks.companies);
  }

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
