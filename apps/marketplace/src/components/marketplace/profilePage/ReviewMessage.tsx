import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import Link from 'next/link';
import { StarsRating } from '@inc/ui';

export type ReviewProps = {
  ownerId: number;
  noOfReviews: number;
  profilePic: string;
  createdAt: string;
  rating: number;
  username: string;
  companyName: string;
  body: string;
  buyer: boolean;
};

export type ReviewMessageData = {
  data: ReviewProps;
};

const ReviewMessage = ({ data }: ReviewMessageData) => {
  // destructure data
  const {
    ownerId,
    noOfReviews,
    profilePic,
    createdAt,
    rating,
    username,
    companyName,
    body,
    buyer,
  } = data;

  const datetime = useMemo(
    () => DateTime.fromISO(createdAt).toRelative({ locale: 'en-SG' }),
    [createdAt]
  );

  return (
    <List sx={{ m: 2 }}>
      <Box sx={{ m: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Link href={`/profile/${ownerId}`}>
            <Avatar src={profilePic} sx={{ width: 45, height: 45 }} />
          </Link>
          <Stack>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Link
                  href={`/profile/${ownerId}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      flexGrow: 1,
                      fontWeight: 'bold',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {username}
                  </Typography>
                </Link>
                <Typography
                  variant="subtitle1"
                  sx={({ typography }) => ({
                    fontSize: typography.subtitle1,
                    flexGrow: 1,
                  })}
                >
                  &nbsp;review from {buyer ? 'buyer' : 'seller'}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                &#183;
              </Typography>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {datetime}
              </Typography>
            </Stack>
            <Link href="/#" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                component="div"
                sx={{ flexGrow: 1, color: 'grey', '&:hover': { textDecoration: 'underline' } }}
              >
                {companyName}
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Stack direction="row" spacing={1}>
          <Typography variant="body1" sx={{ ml: 2, fontWeight: 'bold' }}>
            {rating.toFixed(1)}
          </Typography>
          <StarsRating rating={rating} />
        </Stack>
      </Box>
      <Box>
        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, color: 'grey', mx: 2, my: 1 }}
        >
          {/* check if display review of reviews based on number */}
          {noOfReviews}
          {noOfReviews === 1 ? ' Review' : ' Reviews'}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1, mx: 2, mb: 3 }}>
          {body}
        </Typography>
      </Box>
      <Divider />
    </List>
  );
};

export default ReviewMessage;
