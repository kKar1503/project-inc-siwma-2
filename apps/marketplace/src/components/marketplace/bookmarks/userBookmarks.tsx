import DisplayResults, { HeaderProps } from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import UserItem from '@/components/marketplace/user/UserItem';
import { User } from '@/utils/api/client/zod/users';

export type UserBookmarksProps = {
  data: User[];
  updateBookmarkData: () => void;
};

const UserBookmarks = ({ data, updateBookmarkData }: UserBookmarksProps) => {
  const Header: HeaderProps = {
    title: {
      single: 'User',
      plural: 'Users',
    },
    noOfItems: data ? data.length : 0,
  };

  return (
    <DisplayResults filter={false} data={Header} subHeader>
      {data && data.length > 0 && (
        <Grid container display="flex" spacing={1}>
          {data.map((item: User) => (
            <Grid item xs={6} md={4} lg={3} key={item.name}>
              <UserItem data={item} updateBookmarkData={updateBookmarkData} />
            </Grid>
          ))}
        </Grid>
      )}
    </DisplayResults>
  );
};

export default UserBookmarks;
