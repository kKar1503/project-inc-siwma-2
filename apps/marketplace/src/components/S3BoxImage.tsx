import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import fetchS3Image from '@/middlewares/fetchS3Image';
import Box, { BoxProps } from '@mui/material/Box';

const useImageQuery = (imgKey: string) => useQuery(['image', imgKey], () => fetchS3Image(imgKey));

export type S3BoxImageProps = BoxProps & { src: string };

const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  e.stopPropagation();
};

const S3BoxImage = ({ src, children, ...others }: S3BoxImageProps) => {
  const { data } = useImageQuery(src);
  const [image, setImage] = useState<{ url: string; name: string | undefined | null } | undefined>();

  useEffect(() => {
    if (!data) return;
    const { url, name } = data;
    setImage({ url, name });
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(url);
  }, [data]);


  return image ? (
    <Link href={image.url} download={image.name} onClick={onClick} style={{ cursor: 'default' }}>
      <Box
        component='img'
        {...others}
        src={image.url}
      >
        {children}
      </Box>
    </Link>
  ) : null;
};

export default S3BoxImage;
