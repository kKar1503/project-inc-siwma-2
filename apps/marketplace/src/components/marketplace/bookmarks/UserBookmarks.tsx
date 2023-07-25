// ** React Imports
import React from 'react';

// ** Mui Imports
import Grid from '@mui/material/Grid';

// ** Custom Components Imports
import DisplayResults, { HeaderDisplayText } from '@/layouts/DisplayResults';
import UserBookmarkItem from '@/components/marketplace/bookmarks/UserBookmarkItem';

// ** Hooks Import
import { useTranslation } from 'react-i18next';

// ** Types Imports
import type { User } from '@/utils/api/client/zod/users';

export type UserBookmarksProps = {
  users: User[] | undefined;
  /** Callback function to inform the update of bookmark data */
  updateBookmarkData: () => void;
};

/**
 * User bookmark component that display
 * a list of users that are bookmarked.
 */
const UserBookmarks = ({ users, updateBookmarkData }: UserBookmarksProps) => {
  // ** Hooks
  const { t } = useTranslation();

  // ** Vars
  const header: HeaderDisplayText = {
    title: {
      single: t('User'),
      plural: t('Users'),
    },
    noOfItems: users ? users.length : 0,
  };

  return (
    <DisplayResults filter={false} header={header} subHeader>
      {users && users.length > 0 && (
        <Grid container display="flex" spacing={1}>
          {users.map((user) => (
            <Grid item xs={6} md={4} lg={3} key={user.name}>
              <UserBookmarkItem user={user} updateBookmarkData={updateBookmarkData} />
            </Grid>
          ))}
        </Grid>
      )}
    </DisplayResults>
  );
};

export default UserBookmarks;
