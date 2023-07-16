import DisplayResults, { HeaderDisplayText } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import UserItem from '@/components/marketplace/user/UserItem';
import { User } from '@/utils/api/client/zod/users';
import { useTranslation } from 'react-i18next';

export type UserBookmarksProps = {
  users: User[];
  updateBookmarkData: () => void;
};

/**
 * User bookmark component that display
 * a list of users that are bookmarked.
 */
const UserBookmarks = ({ users, updateBookmarkData }: UserBookmarksProps) => {
  const { t } = useTranslation();

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
              <UserItem user={user} updateBookmarkData={updateBookmarkData} />
            </Grid>
          ))}
        </Grid>
      )}
    </DisplayResults>
  );
};

export default UserBookmarks;
