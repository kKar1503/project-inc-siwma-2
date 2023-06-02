import DisplayResults from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { User } from '@/utils/api/client/zod/users';

const UserBookmarks = ({ data }: { data: User[] }) => {
  const sortData = () => {
    data.map((item: User) => {
      console.log(item.name);
      return item.name;
    });
  };
  sortData();
  return (
    <DisplayResults filter={false} data={{ title: 'Users', noOfItems: data.length }}>
      {data && data.length > 0 && (
        <Grid container display="flex" spacing={1}>
          {data.map((item: User) => (
            <Grid item sm={3} md={4} key={item.name}>
              <Typography>{item.name}</Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </DisplayResults>
  );
};

export default UserBookmarks;
