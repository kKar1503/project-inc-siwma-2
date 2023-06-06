import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import ListingBookmarks from '@/components/marketplace/bookmarks/listingBookmarks';
import UserBookmarks from '@/components/marketplace/bookmarks/userBookmarks';

import fetchUser from '@/middlewares/fetchUser';
import fetchListing from '@/middlewares/fetchListing';

import { Listing } from '@/utils/api/client/zod/listings';
import { User } from '@/utils/api/client/zod/users';

import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

export type BookmarkTypeProps = 'LISTINGS' | 'USERS';

export type RawUserProps = {
  data: User[];
};

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery('user', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });

  return data;
};

const Bookmarks = () => {
  const [selectedButton, setSelectedButton] = useState<BookmarkTypeProps>('LISTINGS');
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const userDetails = useGetUserQuery(loggedUserUuid);

  const handleButtonClick = useCallback((type: BookmarkTypeProps) => {
    setSelectedButton(type);
  }, []);

  const findListings = async (listingIDs: string[]) => {
    if (listingIDs.length === 0) {
      setListings([]);
      return;
    }

    const listings = await Promise.all(listingIDs.map(fetchListing));
    setListings(listings);
  };

  const findUsers = async (userIDs: string[]) => {
    if (userIDs.length === 0) {
      setUsers([]);
      return;
    }

    const usersData = await Promise.all(userIDs.map(fetchUser));
    const users = usersData[0]?.data.data;
    setUsers(users);
  };

  useEffect(() => {
    if (userDetails) {
      const { bookmarks } = userDetails.data.data[0];

      findListings(bookmarks.listings);
      findUsers(bookmarks.users);
    }
  }, [userDetails]);

  const updateBookmarkData = async () => {
    const updatedUserDetails = await fetchUser(loggedUserUuid);
    const updatedBookmarkData = updatedUserDetails?.data.data[0]?.bookmarks;

    findListings(updatedBookmarkData.listings);
    findUsers(updatedBookmarkData.users);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} display="flex" justifyContent="center">
          {['LISTINGS', 'USERS'].map((type) => (
            <Grid item xs={6} md={6} key={type}>
              <Button
                size="large"
                variant={selectedButton === type ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick(type as BookmarkTypeProps)}
                fullWidth
              >
                {type}
              </Button>
            </Grid>
          ))}
        </Grid>
        {selectedButton === 'LISTINGS' && (
          <ListingBookmarks data={listings} updateBookmarkData={updateBookmarkData} />
        )}
        {selectedButton === 'USERS' && (
          <UserBookmarks data={users} updateBookmarkData={updateBookmarkData} />
        )}
      </Grid>
    </Container>
  );
};

export default Bookmarks;
