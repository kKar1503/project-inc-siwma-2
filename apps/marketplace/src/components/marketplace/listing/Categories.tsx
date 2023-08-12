import { TCategory } from '@/types/category';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import S3CardImage from '@/components/S3CardImage';
import { useResponsiveness } from '@inc/ui';
import { useTranslation } from 'react-i18next';

const CategoryCard: React.FC<TCategory> = ({ id, name, image }) => {
  const [isSm] = useResponsiveness(['sm']);
  const { t } = useTranslation();

  return (
    <Card>
      <CardActionArea href={`/category/${name}-${id}`}>
        <S3CardImage
          height={isSm ? 140 : 180}
          src={image}
          title={name}
          placeholder='/images/category-placeholder.svg'
          allowClickThrough
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
