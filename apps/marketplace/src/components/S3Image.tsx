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
    const response = await fetch(imgSrc, {
      headers: {
        'Access-Control-Request-Headers': '*',
      },
    });
    return {
      blob: await response.blob(),
      originalName: response.headers.get('x-amz-meta-original-name'),
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

  const [image, setImage] = useState<{url: string,name:string } | undefined>(undefined);

  const response = useImageQuery(`https://${bucketName}.s3.${region}.amazonaws.com/${src}`);


  useEffect(() => {
    if (response === undefined) return;
    try {
      console.log(response);
      const name = response.originalName || alt;

      const renamedFile = new File([response.blob], name, { type: response.blob.type });
      const url = URL.createObjectURL(renamedFile);
      URL.createObjectURL(renamedFile);

      setImage({
        url,
        name,
      });
    } catch (e) {
      // error
    }
  }, [response]);


  return <a href={image?.url} download={image?.name}><img src={image?.url} alt={alt} {...others} /></a>;
};

export default S3Image;
