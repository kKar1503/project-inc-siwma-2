import { TCategory } from '@/types/category';
import { Card, CardContent, Typography, CardMedia, CardActionArea, SxProps } from '@mui/material';
import React, { useMemo } from 'react';
import S3CardImage from '@/components/S3CardImage';
import { useResponsiveness } from '@inc/ui';

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
  const categoryHeight: SxProps = useMemo(() => {
    if (isSm) return { height: '230px' };
    return { height: '260px' };
  }, [isSm]);
  return (
    <Card>
      <CardActionArea
        sx={categoryHeight}
        href={`/searchResult?search=&sortBy=recent_newest&category=${id}&negotiable=&minPrice=&maxPrice=`}
      >
        <S3CardImage height={140} src={image} title={name} alt={name} placeholder="" />
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
