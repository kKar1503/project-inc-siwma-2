import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useQuery } from 'react-query';

export type S3ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

const bucketName = 'imagebuckettesting';
// const bucketName = process.env.AWS_BUCKET as string || 'siwma-marketplace';
const region = process.env.AWS_REGION as string || 'ap-southeast-1';

const useImageQuery = (imgSrc: string) => {
  const { data } = useQuery(['image', imgSrc], async () => {
    console.log('fetching image');
    const response = await fetch(imgSrc, {
      headers: {
        'Access-Control-Request-Headers': '*',
      },
    });
    return {
      url: URL.createObjectURL(await response.blob()),
      name: response.headers.get('x-amz-meta-original-name'),
    };
  }, {
    enabled: imgSrc !== undefined,
  });
  return data;
};

const S3Image = ({
                   src,
                   alt,
                   priority = false,
                   ...others
                 }: S3ImageProps) => {

  // fetch the image from S3 with headers

  const [image, setImage] = useState<{ url: string, name?: string } | undefined>();

  const response = useImageQuery(`https://${bucketName}.s3.${region}.amazonaws.com/${src}`);



  useEffect(() => {
    if (response === undefined) return () => {
      // empty cleanup as we don't have anything to clean up
    };
    try {
      const { url, name } = response;

      setImage({
        url,
        name: name || alt,
      });

      return () => {
        // cleanup
        URL.revokeObjectURL(url);
      };
    } catch (e) {
      // error
    }
    return () => {
      // empty cleanup as we don't have anything to clean up
    };
  }, [alt, response]);


  return image ? (
    <a href={image.url} download={image.name}>
      <Image src={image.url} alt={alt} priority={priority} {...others} />
    </a>
  ) : null;
};

export default S3Image;
