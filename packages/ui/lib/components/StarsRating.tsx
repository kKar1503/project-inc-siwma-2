import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';

type StarRatingProps = {
  rating: number;
  precision?: number;
  // size prop will only accept these strings
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
};

const StarsRating = ({ rating, precision, size, readOnly }: StarRatingProps) => {
  const theme = useTheme();

  return (
    <Rating
      defaultValue={rating}
      readOnly={readOnly}
      size={size}
      precision={precision}
      sx={{ color: theme.palette.secondary['main'] }}
      emptyIcon={<StarIcon sx={{ color: theme.palette.grey[400] }} />}
    />
  );
};

StarsRating.defaultProps = {
  size: 'medium',
  precision: 0.5,
  readOnly: true,
};

export default StarsRating;
