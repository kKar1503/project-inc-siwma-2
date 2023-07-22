const DISABLE_RENAME_INTEGRATION = true;

const fetchS3Image = async (imgKey: string) => {
  if(!imgKey) return undefined;
  const imgSrc = `https://s3.karlok.dev/${imgKey}`;
  if (DISABLE_RENAME_INTEGRATION) return { url: imgSrc, name: undefined };
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
