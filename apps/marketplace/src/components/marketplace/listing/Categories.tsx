import { TCategory } from '@/types/category';
import { Card, CardContent, Typography, CardMedia, CardActionArea, SxProps } from '@mui/material';
import React, { useMemo } from 'react';
import S3CardImage from '@/components/S3CardImage';
import { useResponsiveness } from '@inc/ui';
import placeholder from 'public/images/category-placeholder.svg';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Card>
      <CardActionArea href={`/category/${name}-${id}`}>
        <S3CardImage
          height={isSm ? 140 : 180}
          src={image}
          title={name}
          alt={name}
          placeholder={placeholder.src}
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
