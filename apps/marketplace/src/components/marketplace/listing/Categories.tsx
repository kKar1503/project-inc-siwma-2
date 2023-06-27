import { TCategory } from '@/types/category';
import { Card, CardContent, Typography, CardMedia, CardActionArea, SxProps } from '@mui/material';
import React, { useMemo } from 'react';
import S3CardImage from '@/components/S3CardImage';
import { useResponsiveness } from '@inc/ui';
import placeholder from 'public/images/category-placeholder.svg';

const CategoryCard: React.FC<TCategory> = ({
  id,
  name,
  description,
  image,
  crossSectionImage,
  active,
  parameters,
}) => {
  const [isSm] = useResponsiveness(['sm']);

  return (
    <Card>
      <CardActionArea
        href={`/searchResult?search=&sortBy=recent_newest&category=${id}&negotiable=&minPrice=&maxPrice=`}
      >
        <S3CardImage height={isSm ? 140 : 180} src={image} title={name} alt={name} placeholder={placeholder.src} />
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ padding: '0' }} gutterBottom variant="h6" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
