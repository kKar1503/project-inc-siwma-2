import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import fetchS3Image from '@/services/fetchS3Image';
import Box, { BoxProps } from '@mui/material/Box';

const useImageQuery = (imgKey: string) => useQuery(['image', imgKey], () => fetchS3Image(imgKey));

export type S3BoxImageProps = BoxProps & { src: string; placeholderImg?: string };

const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  e.stopPropagation();
};

const S3BoxImage = ({ src, placeholderImg, children, ...others }: S3BoxImageProps) => {
  const { data } = useImageQuery(src);
  const [image, setImage] = useState<
    { url: string; name: string | undefined | null } | undefined
  >();

  useEffect(() => {
    if (!data) return;
    const { url, name } = data;
    if (url === '' && placeholderImg) {
      setImage({ url: placeholderImg, name });
      return;
    }
    setImage({ url, name });
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(url);
  }, [data]);

  return image ? (
    <Link
      href={image.url}
      download={image.name}
      onClick={onClick}
      style={{ cursor: 'default', textDecoration: 'none' }}
    >
      <Box component="img" src={image.url} {...others}>
        {children}
      </Box>
    </Link>
  ) : null;
};

export default S3BoxImage;
