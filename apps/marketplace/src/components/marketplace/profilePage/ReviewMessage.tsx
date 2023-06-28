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
import fetchProfileCompany from '@/middlewares/fetchProfileCompany';

export type ReviewMessageData = {
  data: Review;
};

const useGetUser = (userUuid: string) => {
  const { data } = useQuery(['userdata', userUuid], async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const useUserCompany = (companyId: string | undefined) => {
  const { data } = useQuery(['userdata', companyId], async () => fetchProfileCompany(companyId), {
    enabled: companyId !== undefined,
  });
  return data;
};

const ReviewMessage = ({ data }: ReviewMessageData) => {
  // destructure data
  const user = useGetUser(data.userId);
  const company = useUserCompany(user?.company);

  const datetime = useMemo(
    () => DateTime.fromISO(data.createdAt).toRelative({ locale: 'en-SG' }),
    [data.createdAt]
  );

  const [isSm] = useResponsiveness(['sm']);

  return (
    <List sx={{ m: 2 }}>
      <Box sx={{ m: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Link href={`/profile/${data.userId}`}>
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
                    href={`/profile/${data.userId}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Typography
                      component="div"
                      sx={({ typography }) => ({
                        fontSize: isSm ? typography.body1 : typography.h6,
                        flexGrow: 1,
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                      })}
                    >
                      {user?.name}
                    </Typography>
                  </Link>
                  <Typography
                    variant={isSm ? 'body2' : 'body1'}
                    sx={{ flexGrow: 1, ml: isSm ? 0 : 1, alignItems: 'center' }}
                  >
                    Review from {data.type}
                  </Typography>
                </Stack>
              </Box>
              <Typography
                sx={({ typography }) => ({ fontSize: typography.body1, fontWeight: 800 })}
              >
                &#183;
              </Typography>
              <Typography variant={isSm ? 'body2' : 'body1'} sx={{ flexGrow: 1 }}>
                {datetime}
              </Typography>
            </Stack>
            <Link href="/#" style={{ textDecoration: 'none' }}>
              <Typography
                variant={isSm ? 'body2' : 'body1'}
                component="div"
                sx={{ flexGrow: 1, color: 'grey', '&:hover': { textDecoration: 'underline' } }}
              >
                {company?.name}
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Stack direction="row" spacing={1}>
          <Typography
            sx={({ typography }) => ({ fontSize: typography.body1, ml: 2, fontWeight: 500 })}
          >
            {data.rating.toFixed(1)}
          </Typography>
          <StarsRating rating={data.rating} />
        </Stack>
      </Box>
      <Box>
        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, mx: 2, mb: 3, mt: 1, wordWrap: 'break-word' }}
        >
          {data.review}
        </Typography>
      </Box>
      <Divider />
    </List>
  );
};

export default ReviewMessage;
