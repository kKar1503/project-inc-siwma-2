import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import Link from 'next/link';
import StarRating from './StarRatings';

export type ReviewProps = {
  id: number;
  createdAt: string;
  rating: number;
  username: string;
  companyName: string;
  body: string;
};

const ReviewMessage = ({ id, createdAt, rating, username, companyName, body }: ReviewProps) => {
  const datetime = useMemo(
    () => DateTime.fromISO(createdAt).toRelative({ locale: 'en-SG' }),
    [createdAt]
  );

  return (
    <List sx={{ m: 2, maxWidth: 'md' }}>
      <Box sx={{ m: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src="/broken-image.jpg" sx={{ width: 45, height: 45 }} />
          <Stack>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <Link href="/#" style={{ textDecoration: 'none', color: 'black' }}>
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
              <Typography sx={{ fontWeight: 'bold' }}>
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
      <Box>
        <StarRating rating={rating} />
      </Box>
      <Box>
        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, color: 'grey', mx: 2, my: 1 }}
        >
          {id}
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
