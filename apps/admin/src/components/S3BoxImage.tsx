import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import fetchS3Image from '@/services/fetchS3Image';
import Box, { BoxProps } from '@mui/material/Box';

const useImageQuery = (imgKey: string) => useQuery(['image', imgKey], () => fetchS3Image(imgKey), {
  enabled: !!imgKey && imgKey !== '',
});

export type S3ImageProps = BoxProps & { src: string; placeholderImg?: string; allowClickThrough?: boolean };
export type S3BoxImageProps = BoxProps & S3ImageProps;

const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  e.stopPropagation();
};

const S3BoxImage = ({ src, placeholderImg, children, allowClickThrough, onError, ...others }: S3BoxImageProps) => {
  const imgData = useImageQuery(src);
  const [image, setImage] = useState<{ url: string | undefined; name: string | undefined }>({
    url: undefined,
    name: undefined,
  });

  useEffect(() => {
    if (!imgData.isSuccess) return;
    if (!imgData.data) return;
    const { url, name } = imgData.data;
    setImage({ url, name });

    // eslint-disable-next-line consistent-return
    if (url !== undefined) return () => URL.revokeObjectURL(url);
  }, [imgData.data, imgData.isFetched, imgData.isSuccess]);

  const onImgError = onError || (() => {
    setImage({ url: undefined, name: undefined });
  });

  return (
    <Link
      href={image.url || placeholderImg || '/images/catPlaceholder.png'}
      download={image.name}
      onClick={onClick}
      style={{ cursor: 'default', textDecoration: 'none', pointerEvents: allowClickThrough ? 'none' : undefined }}
      tabIndex={-1}
    >
      <Box
        component='img'
        src={image.url || placeholderImg || '/images/catPlaceholder.png'}
        onError={onImgError}
        {...others}
      >
        {children}
      </Box>
    </Link>
  );
};

export default S3BoxImage;
