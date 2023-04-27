import { Rating, Stack, Typography, styled } from '@mui/material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#00C853',
  },
});

const StarRating = ({ rating }: { rating: number }) => (
  <Stack direction="row" spacing={1}>
    <Typography sx={{ mx: 2 }}>{rating.toFixed(1)}</Typography>
    <StyledRating name="half-rating" value={rating} precision={0.5} readOnly />
  </Stack>
);

export default StarRating;
