import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export type S3ImageProps = {
  src: string;
  alt: string;
};

const bucketName = 'imagebuckettesting';
// const bucketName = process.env.AWS_BUCKET as string || 'siwma-marketplace';
const region = process.env.AWS_REGION as string || 'ap-southeast-1';

const STATES = {
  NOT_STARTED: 0,
  LOADING: 1,
  LOADED: 2,
  FAILED: 3,
};

const useImageQuery = (imgSrc: string) => {
  const { data } = useQuery(['image', imgSrc], async () => {
    const response = await fetch(imgSrc, {
      method: 'GET',
      headers: {
        'Access-Control-Request-Headers': 'x-amz-meta-original-name',
      },
    });
    console.log(response);
    return {
      blob: await response.blob(),
      originalName: response.headers.get('x-amz-meta-original-name'),
      headers: response.headers,
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
  const [state, setState] = useState<number>(STATES.NOT_STARTED);
  const [headers, setHeaders] = useState<boolean>(true);

  const response = useImageQuery(`https://${bucketName}.s3.${region}.amazonaws.com/${src}`);


  useEffect(() => {
    if (response === undefined) {
      setState(STATES.LOADING);
      return;
    }
    console.log(response);
    try {
      const url = URL.createObjectURL(response.blob);
      console.log(response.headers);
      setImageUrl(url);
      setState(STATES.LOADED);
    } catch (e) {
      setState(STATES.FAILED);
    }
  }, [response]);

  switch (state) {
    case STATES.NOT_STARTED:
      return <p>...</p>;
    case STATES.LOADING:
      return <p>Loading...</p>;
    case STATES.LOADED:
      return <img src={imageUrl} alt={alt} {...others} />;
    case STATES.FAILED:
      return <p>Failed to load image</p>;
    default:
      return <p>Unexpected state</p>;
  }
};

export default S3Image;
