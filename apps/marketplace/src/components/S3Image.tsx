import React, { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { useQuery } from 'react-query';
import fetchS3Image from '@/middlewares/fetchS3Image';

const useImageQuery = (imgKey: string) => useQuery(['image', imgKey], () => fetchS3Image(imgKey));

export type S3ImageProps = ImageProps & { src: string; };

const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  e.stopPropagation();
}

const S3Image = ({ src, alt, ...others }: S3ImageProps) => {
  const { data } = useImageQuery(src);
  const [image, setImage] = useState<{ url: string; name: string; } | undefined>();

  useEffect(() => {
    if (!data) return;
    const { url, name } = data;
    setImage({ url, name: name || alt });
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(url);
  }, [alt, data]);

  return image ? (
    <a href={image.url} download={image.name} onClick={onClick} style={{cursor:'default'}}>
      <Image src={image.url} alt={alt} title={image.name} {...others}  />
    </a>
  ) : null;
};

export default S3Image;
