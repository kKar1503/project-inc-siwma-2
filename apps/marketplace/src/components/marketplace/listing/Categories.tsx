import { TCategory } from '@/types/category';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';
import React from 'react';

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
      <CardMedia
        sx={{ height: 140 }}
        image="https://res.cloudinary.com/coin-nft/image/upload/c_limit,q_auto,w_329/f_auto/v1/cache/1/71/ab/71ab6c19f578fd0805c6ac9e42125ab20c51ba21e0c44ead672a963297acd70f-YzA1Yzc1YTktNDk4MS00YWY0LTgyYzgtOWU0YzcxNzM1ODRj?_a=ATCkFAA0"
        title={name}
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
