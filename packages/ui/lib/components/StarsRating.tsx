import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

type StarRatingProps = {
  rating: number;
  precision: number;
  // size prop will only accept these strings
  size: 'small' | 'medium' | 'large';
  readOnly: boolean;
};

const StarsRating: React.FC<StarRatingProps> = (props) => (
  <Rating
    defaultValue={props.rating}
    readOnly={props.readOnly}
    size={props.size}
    precision={props.precision}
    sx={{ color: '#00C853' }}
    emptyIcon={<StarIcon fontSize="inherit" />}
  />
);

export default StarsRating;
