import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { useResponsiveness } from '@inc/ui';
import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';

const CategoryCardSkeleton = () => {
  const [isSm] = useResponsiveness(['sm']);

  return (
    <Card>
      <CardActionArea disabled>
        <CardMedia sx={{ height: isSm ? 140 : 180, padding: 0 }}>
          <Skeleton height="100%" variant="rectangular" />
        </CardMedia>
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton width="100%" height="2rem" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCardSkeleton;
