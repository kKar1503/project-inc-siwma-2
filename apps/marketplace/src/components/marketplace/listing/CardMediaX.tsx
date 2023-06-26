import fetchS3Image from '@/middlewares/fetchS3Image';
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useImageQuery = (imgKey: string) => useQuery(['image', imgKey], () => fetchS3Image(imgKey));

type CardMediaXProps = CardMediaProps & {
  src: string;
  alt: string;
  height: number;
};

/**
 * Extends the CardMedia component from material UI
 */
const CardMediaX = ({ src, alt, height }: CardMediaXProps) => {
  const { data } = useImageQuery(src);
  const [image, setImage] = useState<{ url: string; name: string } | undefined>();

  useEffect(() => {
    if (!data) return;
    const { url, name } = data;
    setImage({ url, name: name || alt });
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(url);
  }, [alt, data]);

  console.log({ image });

  return (
    <CardMedia component="div" style={{ position: 'relative', width: '100%', height }}>
      <Image src={image?.url || ''} alt={alt} fill />
    </CardMedia>
  );
};

export default CardMediaX;
