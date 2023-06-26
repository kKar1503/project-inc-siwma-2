import React from 'react';
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';
import S3Image from '@/components/S3Image';


export type S3CardMediaProps = CardMediaProps & { image: string };

const S3CardImage = ({ image, title, ...others }: S3CardMediaProps) =>
  (
    <CardMedia component='div'  {...others}>
      <S3Image src={image} alt={title || ''} fill />
    </CardMedia>
  );

export default S3CardImage;
