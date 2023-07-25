// ** React Imports
import React, { useState, useEffect } from 'react';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

// ** Custom Components Imports
import UserBookmarks from '@/components/marketplace/bookmarks/UserBookmarks';

// ** Hooks Imports
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import useUser from '@/services/users/useUser';
import useMultipleUsers from '@/services/users/useMultipleUsers';

const BUTTONS = ['LISTINGS', 'USERS'] as const;
export type BookmarkType = (typeof BUTTONS)[number];

const Bookmarks = () => {
  // ** States
  const [selectedButton, setSelectedButton] = useState<BookmarkType>('LISTINGS');
  // const [bookmarkedListings, setBookmarkedListings] = useState<Listing[]>([]);
  const [bookmarkedUserUuids, setBookmarkedUsersUuids] = useState<string[]>([]);

  // ** Hooks
  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const { data: userDetails, refetch: refetchUser } = useUser(loggedUserUuid);
  const { data: bookmarkedUsers } = useMultipleUsers(bookmarkedUserUuids);
  const { t } = useTranslation();

  // ** Effects
  useEffect(() => {
    if (userDetails?.bookmarks) {
      if (userDetails?.bookmarks?.users) {
        setBookmarkedUsersUuids(userDetails.bookmarks.users);
      } else {
        setBookmarkedUsersUuids([]);
      }
    }
  }, [userDetails]);

  // ** Handlers
  const handleButtonClick = (type: BookmarkType) => {
    if (selectedButton === type) {
      return;
    }
    setSelectedButton(type);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} display="flex" justifyContent="center">
          {BUTTONS.map((type) => (
            <Grid item xs={12} md={6} key={type}>
              <Button
                size="large"
                variant={selectedButton === type ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick(type)}
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
          <UserBookmarks users={bookmarkedUsers} updateBookmarkData={refetchUser} />
        )}
      </Grid>
    </Container>
  );
};

export default Bookmarks;
