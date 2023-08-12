import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';
import S3BoxImage, { S3ImageProps } from '@/components/S3BoxImage';

type CardMediaXProps = CardMediaProps & S3ImageProps & {
  height: number;
};

/**
 * Extends the CardMedia component from material UI
 */
const CardMediaX = ({ src, placeholder, height, allowClickThrough }: CardMediaXProps) => (
  <CardMedia component='div' style={{ position: 'relative', width: '100%', height }}>
    <S3BoxImage src={src} placeholderImg={placeholder} height='100%' width='100%' style={{ objectFit: 'cover' }}
                allowClickThrough={allowClickThrough} />
  </CardMedia>
);


export default CardMediaX;
