// ** React Imports
import React, { useState, useEffect, useCallback } from 'react';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

// ** Custom Components Imports
import UserBookmarks from '@/components/marketplace/bookmarks/UserBookmarks';

// ** Type Imports
import type { Listing } from '@/utils/api/client/zod/listings';
import type { User } from '@/utils/api/client/zod/users';

// ** Hooks Imports
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import useUser from '@/services/users/fetchUser';
import fetchListing from '@/services/fetchListing';

export type BookmarkTypeProps = 'LISTINGS' | 'USERS';

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery(['user', userUuid], async () => useUser(userUuid));

  return data;
};

const Bookmarks = () => {
  const [selectedButton, setSelectedButton] = useState<BookmarkTypeProps>('LISTINGS');
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const userDetails = useGetUserQuery(loggedUserUuid);

  const { t } = useTranslation();

  const handleButtonClick = useCallback((type: BookmarkTypeProps) => {
    setSelectedButton(type);
  }, []);

  const findListings = async (listingIDs: string[]) => {
    if (listingIDs.length === 0) {
      setListings([]);
      return;
    }

    const listings = await Promise.all(listingIDs.map((id) => fetchListing(id)));
    setListings(listings);
  };

  const findUsers = async (userIDs: string[]) => {
    if (userIDs.length === 0) {
      setUsers([]);
      return;
    }

    const usersData = await Promise.all(userIDs.map(useUser));
    setUsers(usersData);
  };

  useEffect(() => {
    if (userDetails?.bookmarks) {
      const { listings, users } = userDetails.bookmarks;

      findListings(listings);
      findUsers(users);
    }
  }, [userDetails]);

  const updateBookmarkData = async () => {
    const updatedUserDetails = await useUser(loggedUserUuid);
    const updatedBookmarkData = updatedUserDetails?.bookmarks;

    if (updatedBookmarkData) {
      findListings(updatedBookmarkData.listings);
      findUsers(updatedBookmarkData.users);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} display="flex" justifyContent="center">
          {['LISTINGS', 'USERS'].map((type) => (
            <Grid item xs={12} md={6} key={type}>
              <Button
                size="large"
                variant={selectedButton === type ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick(type as BookmarkTypeProps)}
                fullWidth
              >
                {t([type])}
              </Button>
            </Grid>
          ))}
        </Grid>
        {selectedButton === 'LISTINGS' &&
          // <ListingBookmarks data={listings} updateBookmarkData={updateBookmarkData} />
          'no listing data for now'}
        {selectedButton === 'USERS' && (
          <UserBookmarks users={users} updateBookmarkData={updateBookmarkData} />
        )}
      </Grid>
    </Container>
  );
};

export default Bookmarks;
