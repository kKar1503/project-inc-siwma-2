import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import fetchS3Image from '@/services/fetchS3Image';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { S3ImageProps } from '@/components/S3BoxImage';

const useImageQuery = (imgKey: string) => useQuery(['image', imgKey], () => fetchS3Image(imgKey));

export type S3AvatarProps = AvatarProps & S3ImageProps;

const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  e.stopPropagation();
};

const S3Avatar = ({ src, alt, children, allowClickThrough, ...others }: S3AvatarProps) => {
  const { data } = useImageQuery(src);
  const [image, setImage] = useState<{ url: string; name?: string } | undefined>();

  useEffect(() => {
    if (!data) return;
    const { url, name } = data;
    setImage({ url, name: name || alt });
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(url);
  }, [alt, data]);

  return image ? (
    <Link
      href={image.url}
      download={image.name}
      onClick={onClick}
      style={{ cursor: 'default', textDecoration: 'none', pointerEvents: allowClickThrough ? 'none' : undefined }}
    >
      <Avatar src={image.url} {...others}>
        {children}
      </Avatar>
    </Link>
  ) : null;
};

export default S3Avatar;
