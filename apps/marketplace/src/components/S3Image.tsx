import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export type S3ImageProps = {
  src: string;
  alt: string;
};

const bucketName = 'imagebuckettesting';
// const bucketName = process.env.AWS_BUCKET as string || 'siwma-marketplace';
const region = process.env.AWS_REGION as string || 'ap-southeast-1';

const useImageQuery = (imgSrc: string) => {
  const { data } = useQuery(['image', imgSrc], async () => {
    const response = await fetch(imgSrc);
    return {
      blob: await response.blob(),                                      // image blob
      originalName: response.headers.get('x-amz-meta-original-name'),   // null
      headers: response.headers,                                        // {}
    };
  }, {
    enabled: imgSrc !== undefined,
  });
  return data;
};

const S3Image = ({
                   src,
                   alt,
                   ...others
                 }: S3ImageProps) => {

  // fetch the image from S3 with headers

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const response = useImageQuery(`https://${bucketName}.s3.${region}.amazonaws.com/${src}`);


  useEffect(() => {
    if (response === undefined) return;
    try {
      const url = URL.createObjectURL(response.blob);
      setImageUrl(url);
    } catch (e) {
      // error
    }
  }, [response]);


  return <img src={imageUrl} alt={alt} {...others} />;
};

export default S3Image;
