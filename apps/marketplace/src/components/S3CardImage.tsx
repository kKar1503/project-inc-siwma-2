import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';
import S3BoxImage  from '@/components/S3BoxImage';

type CardMediaXProps = CardMediaProps & {
  src: string;
  placeholder: string;
  alt: string;
  height: number;
};

/**
 * Extends the CardMedia component from material UI
 */
const CardMediaX = ({ src, alt, placeholder, height }: CardMediaXProps) => (
  <CardMedia component='div' style={{ position: 'relative', width: '100%', height }}>
    <S3BoxImage src={src} placeholderImg={placeholder} maxHeight='100%' maxWidth='100%' style={{ objectFit: 'cover' }} />
  </CardMedia>
);


export default CardMediaX;
