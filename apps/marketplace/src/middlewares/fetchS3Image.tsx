const bucketName = process.env.AWS_BUCKET as string || 'siwma-marketplace';
const region = process.env.AWS_REGION as string || 'ap-southeast-1';

const fetchS3Image = async (imgKey : string) => {
  const imgSrc = `https://${bucketName}.s3.${region}.amazonaws.com/${imgKey}`

  try {
    const response = await fetch(imgSrc, {
      headers: {
        'Access-Control-Request-Headers': '*',
      },
    });

    return {
      url: URL.createObjectURL(await response.blob()),
      name: response.headers.get('x-amz-meta-original-name'),
    };
  }
  catch (error) {
    return {
      url: imgSrc,
      name: undefined,
    }
  }
}
export default fetchS3Image;
