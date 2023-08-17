import { TCategory } from '@/types/category';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import S3CardImage from '@/components/S3CardImage';
import { useResponsiveness } from '@inc/ui';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';

const CategoryCard: React.FC<TCategory> = ({ id, name, image }) => {
  const [isSm] = useResponsiveness(['sm']);
  const { t } = useTranslation();

  return (
    <Card sx={{ boxShadow: '10px 10px 12px -4px rgba(217,217,217,0.7)' }}>
      <CardActionArea href={`/category/${name}-${id}`}>
        <S3CardImage
          height={isSm ? 140 : 180}
          src={image}
          title={name}
          placeholder='/images/category-placeholder.svg'
          allowClickThrough
        />
        <Divider sx={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '2px' }} />
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
