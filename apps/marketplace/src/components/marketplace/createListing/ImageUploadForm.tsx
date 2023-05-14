import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

type SetImageProps = {
  setImages: (parameters: ImageProps[]) => void;
};

export type ImageProps = {
  fileName: string;
  url: string;
};

const ImageUploadForm = ({ setImages }: SetImageProps) => {
  const [images, setPreivewImages] = useState<{ file: File; preview: string }[]>([]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || []);
    const previewImages = selectedImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreivewImages((prevImages) => [...prevImages, ...previewImages].slice(0, 10));

    const imageData = selectedImages.map((file) => ({
      fileName: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages(imageData);
  };

  const handleImageRemove = (index: number) => {
    setPreivewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    setPreivewImages([]);
  };

  const renderImages = () => {
    if (images.length === 0) return null;

    return (
      <Grid container spacing={2}>
        {images.map(({ file, preview }, index) => (
          <Grid item xs={2} md={1} key={file.name}>
            <Box position="relative" mt="1rem">
              <img
                src={preview}
                alt={file.name}
                style={{ width: '100px', height: '100px', paddingRight: '1rem' }}
              />
              <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 2000,
                  color: 'primary.main',
                  bgcolor: 'background.paper',
                }}
                onClick={() => handleImageRemove(index)}
              >
                <CancelIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Select Photos (Up to 10 Images)
        </Typography>
        <Typography variant="body1">Choose images to display for the listing</Typography>
        <input
          type="file"
          accept="image/*"
          id="upload-btn"
          multiple
          hidden
          onChange={handleImageSelect}
        />
        <label htmlFor="upload-btn">
          <Button
            variant="contained"
            component="span"
            sx={{ mt: '1rem' }}
            onClick={handleUploadClick}
          >
            Upload a Photo
          </Button>
        </label>
        {renderImages()}
        <Divider sx={{ my: 2 }} />
      </Grid>
    </>
  );
};

export default ImageUploadForm;
