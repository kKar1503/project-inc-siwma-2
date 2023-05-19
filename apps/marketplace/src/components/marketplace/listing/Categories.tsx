import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import React from 'react';

export type Category = {
  name: string;
  src: string;
  href: string;
};

const CategoryCard: React.FC<Category> = ({ name, src, href }) => (
  <Card>
    <CardActionArea href={href}>
      <CardMedia sx={{ height: 140 }} image={src} title={name} />
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{padding: '0'}} gutterBottom variant="h6" component="div">
          {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default CategoryCard;
