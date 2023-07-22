import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import fetchS3Image from '@/middlewares/fetchS3Image';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

const useImageQuery = (imgKey: string) => useQuery(['image', imgKey], () => fetchS3Image(imgKey), {
  enabled: !!imgKey && imgKey !== '',
});

export type S3AvatarProps = AvatarProps & { src: string, placeholderImg?: string };

const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  e.stopPropagation();
};

const S3Avatar = ({ src, alt, placeholderImg, children, ...others }: S3AvatarProps) => {
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
  }, [imgData.isFetched]);

  return (
    <Link
      href={image.url || placeholderImg || ''}
      download={image.name || alt}
      onClick={onClick}
      style={{ cursor: 'default', textDecoration: 'none' }}
    >
      <Avatar src={image.url || placeholderImg || ''} {...others}>
        {children}
      </Avatar>
    </Link>
  );
};

export default S3Avatar;
