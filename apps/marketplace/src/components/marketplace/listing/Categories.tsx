import { TCategory } from '@/types/category';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';
import S3CardImage from '@/components/S3CardImage';
import { useResponsiveness } from '@inc/ui';
import { useTranslation } from 'react-i18next';

const CategoryCard: React.FC<TCategory> = ({
                                             id,
                                             name,
                                             image,
                                           }) => {
  const [isSm] = useResponsiveness(['sm']);
  const { t } = useTranslation();

  return (
    <Card>
      <CardActionArea
        href={`/searchResult?search=&sortBy=recent_newest&category=${id}&negotiable=&minPrice=&maxPrice=`}
      >
        <S3CardImage
          height={isSm ? 140 : 180}
          src={image}
          title={name}
          alt={name}
          placeholder='/images/category-placeholder.svg'
        />
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ padding: '0' }} gutterBottom variant="h6" component="div">
            {t([name])}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
