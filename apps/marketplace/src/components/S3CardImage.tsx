import fetchS3Image from '@/middlewares/fetchS3Image';
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useImageQuery = (imgKey: string) => useQuery(['image', imgKey], () => fetchS3Image(imgKey));

type S3CardImageProps = CardMediaProps & {
  src: string;
  placeholder: string;
  alt: string;
  height: number;
};

/**
 * Extends the CardMedia component from material UI
 */
const S3CardImage = ({ src, alt, placeholder, height }: S3CardImageProps) => {
  const { data } = useImageQuery(src);
  const [image, setImage] = useState<{ url: string; name: string } | undefined>();

  useEffect(() => {
    if (!data) return;
    const { url, name } = data;
    setImage({ url, name: name || alt });
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(url);
  }, [alt, data]);

  return image ? (
    <CardMedia component="div" style={{ position: 'relative', width: '100%', height }}>
      <Image src={image?.url || placeholder} alt={alt} fill style={{ objectFit: 'cover' }} />
    </CardMedia>
  ) : null;
};

export default S3CardImage;
