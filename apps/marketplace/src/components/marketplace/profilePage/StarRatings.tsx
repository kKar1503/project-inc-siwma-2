import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#00C853',
  },
});

const StarRating = ({ rating }: { rating: number }) => (
  <Stack direction="row" spacing={-1}>
    <Typography sx={{ mx: 2, fontWeight: 'bold' }}>{rating.toFixed(1)}</Typography>
    <StyledRating
      name="half-rating"
      value={rating}
      precision={0.5}
      emptyIcon={<StarIcon />}
      readOnly
    />
  </Stack>
);

export default StarRating;
