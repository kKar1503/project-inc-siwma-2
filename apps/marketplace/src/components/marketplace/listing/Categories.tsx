import { TCategory } from '@/types/category';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';
import React from 'react';
import S3CardImage from '@/components/S3CardImage';

const CategoryCard: React.FC<TCategory> = ({
  id,
  name,
  description,
  image,
  crossSectionImage,
  active,
  parameters,
}) => (
  <Card>
    <CardActionArea href={`/categories/${id}`}>
      <S3CardImage
        height={140}
        src={image}
        title={name}
        alt={name}
        placeholder=''
        />
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ padding: '0' }} gutterBottom variant="h6" component="div">
          {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default CategoryCard;
