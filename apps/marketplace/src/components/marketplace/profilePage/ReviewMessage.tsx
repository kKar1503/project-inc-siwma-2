import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import Link from 'next/link';
import { StarsRating, useResponsiveness } from '@inc/ui';
import { Review } from '@/utils/api/client/zod';
import fetchUser from '@/middlewares/fetchUser';
import { useQuery } from 'react-query';

export type ReviewMessageData = {
  data: Review;
};

const useGetUser = (userUuid: string) => {
  const { data } = useQuery('userdata', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });
  // console.log(data);
  return data;
};

const ReviewMessage = ({ data }: ReviewMessageData) => {
  // destructure data
  const user = useGetUser(data.userId);
  console.log(data)
  // console.log(user);
  console.log(data.userId);
  const datetime = useMemo(
    () => DateTime.fromISO(data.createdAt).toRelative({ locale: 'en-SG' }),
    [data.createdAt]
  );

  const [isSm] = useResponsiveness(['sm']);
  

  return (
    <List sx={{ m: 2 }}>
      <Box sx={{ m: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Link href={`/profile/${data.id}`}>
            <Avatar src={data.userId} sx={{ width: 45, height: 45 }} />
          </Link>
          <Stack>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Stack
                  direction={isSm ? 'column' : 'row'}
                  sx={{
                    ...(isSm ? { alignItems: 'flex-start' } : { alignItems: 'center' }),
                  }}
                >
                  <Link
                    href={`/profile/${data.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Typography
                      variant={isSm ? 'body1' : 'h6'}
                      component="div"
                      sx={{
                        flexGrow: 1,
                        fontWeight: 'bold',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {/* {username} */}
                      {data.userId}
                      {/* {user?.find((x: { id: string; }) => x.id === data?.userId)?.name} */}
                      {user?.name}
                    </Typography>
                  </Link>
                  <Typography
                    variant={isSm ? 'body2' : 'body1'}
                    sx={{ flexGrow: 1, ml: isSm ? 0 : 1, alignItems: 'center' }}
                  >
                    {/* review from {data.type} */}
                  </Typography>
                </Stack>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                &#183;
              </Typography>
              <Typography variant={isSm ? 'body2' : 'body1'} sx={{ flexGrow: 1 }}>
                {datetime}
              </Typography>
            </Stack>
            {/* <Link href="/#" style={{ textDecoration: 'none' }}>
              <Typography
                variant={isSm ? 'body2' : 'body1'}
                component="div"
                sx={{ flexGrow: 1, color: 'grey', '&:hover': { textDecoration: 'underline' } }}
              >
                {companyName}
              </Typography>
            </Link> */}
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Stack direction="row" spacing={1}>
          <Typography variant="body1" sx={{ ml: 2, fontWeight: 'bold' }}>
            {data.rating.toFixed(1)}
          </Typography>
          <StarsRating rating={data.rating} />
        </Stack>
      </Box>
      <Box>
        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, color: 'grey', mx: 2, my: 1 }}
        >
          {/* check if display review of reviews based on number */}
          {/* {noOfReviews}
          {noOfReviews === 1 ? ' Review' : ' Reviews'} */}
          {data.id}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1, mx: 2, mb: 3 }}>
          {data.review}
        </Typography>
      </Box>
      <Divider />
    </List>
  );
};

export default ReviewMessage;
