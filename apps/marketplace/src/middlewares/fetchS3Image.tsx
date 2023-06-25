const fetchS3Image = async (imgKey: string) => {
  const imgSrc = `https://s3.ap-southeast-1.amazonaws.com/s3.karlok.dev/${imgKey}`;
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
  } catch (error) {
    return {
      url: imgSrc,
      name: undefined,
    };
  }
};
export default fetchS3Image;
