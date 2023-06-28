import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';
import S3Image from '@/components/S3Image';

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
    <S3Image src={src} alt={alt} placeholderImg={placeholder} fill style={{ objectFit: 'cover' }} />
  </CardMedia>
);


export default CardMediaX;
