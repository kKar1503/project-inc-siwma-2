import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

type StarRatingProps = {
  rating: number;
  precision?: number;
  // size prop will only accept these strings
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
};

const StarsRating = ({ rating, precision, size, readOnly }: StarRatingProps) => {
  return (
    <Rating
      defaultValue={rating}
      readOnly={readOnly}
      size={size}
      precision={precision}
      sx={{ color: '#00C853' }}
      emptyIcon={<StarIcon fontSize="inherit" />}
    />
  );
};

StarsRating.defaultProps = {
  size: 'medium',
  precision: 0.5,
  readOnly: true,
};

export default StarsRating;
