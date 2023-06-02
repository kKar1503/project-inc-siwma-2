import DisplayResults from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import UserItem from '@/components/marketplace/user/UserItem';
import { User } from '@/utils/api/client/zod/users';

const title = { single: 'User', plural: 'Users' };

const UserBookmarks = ({ data }: { data: User[] }) => (
  <DisplayResults filter={false} data={{ title, noOfItems: data.length }}>
    {data && data.length > 0 && (
      <Grid container display="flex" spacing={1}>
        {data.map((item: User) => (
          <Grid item sm={3} md={4} key={item.name}>
            <UserItem data={item} />
          </Grid>
        ))}
      </Grid>
    )}
  </DisplayResults>
);

export default UserBookmarks;
