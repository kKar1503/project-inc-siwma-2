import { Avatar, Box, Divider, List, Stack, Typography } from '@mui/material';
import { DateTime, Interval } from 'luxon';
import Link from 'next/link';
import StarRating from './starRatings';

export type ReviewProps = {
  id: number;
  createdAt: string;
  rating: number;
  username: string;
  companyName: string;
  body: string;
};

const ReviewMessage = ({ id, createdAt, rating, username, companyName, body }: ReviewProps) => {
  const compareDates = (): string => {
    const createdAtDateTime = DateTime.fromISO(createdAt);
    const intervalDate = Interval.fromDateTimes(createdAtDateTime, DateTime.now());

    const relativeTimeFormat = new Intl.RelativeTimeFormat('en', { style: 'short' });
    return relativeTimeFormat.format(-intervalDate.count('days'), 'day');
  };

  return (
    <List sx={{ m: 2, maxWidth: 'md' }}>
      <Box sx={{ m: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src="/broken-image.jpg" sx={{ width: 45, height: 45 }} />
          <Stack>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <Link href="/#" style={{ textDecoration: 'none', color: 'black' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                  {username}
                </Typography>
              </Link>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {compareDates()}
              </Typography>
            </Stack>
            <Link href="/#" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" component="div" sx={{ flexGrow: 1, color: 'grey' }}>
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
        <Typography variant="body1" component="div" sx={{ flexGrow: 1, mx: 2, my: 1 }}>
          {body}
        </Typography>
      </Box>
      <Divider />
    </List>
  );
};

export default ReviewMessage;
