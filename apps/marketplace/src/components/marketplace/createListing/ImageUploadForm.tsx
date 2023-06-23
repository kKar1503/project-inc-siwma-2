import React, { useState } from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import FormHelperText from '@mui/material/FormHelperText';

export type ImageProps = {
  fileName: string;
  url: string;
};

export type PreviewImageProps = {
  file: File;
  preview: string;
};

export type SetImageProps = {
  setImages: (parameters: Blob[]) => void;
};

const ImageUploadForm = ({ setImages }: SetImageProps) => {
  const [images, setPreviewImages] = useState<PreviewImageProps[]>([]);
  const [error, setError] = useState('');

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewImages([]);
    setError('');

    const selectedImages = Array.from(e.target.files || []);

    if (selectedImages.length + images.length > 10) {
      setError('You can only upload up to 10 images.');
      return;
    }

    const imageFiles = selectedImages.filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length !== selectedImages.length) {
      setError('Only image files are allowed.');
      return;
    }

    const previewImages = selectedImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreviewImages((prevImages) => [...prevImages, ...previewImages].slice(0, 10));

    setImages(imageFiles);

    setError('');
  };

  const handleImageRemove = (index: number) => {
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const openFullImage = (url: string) => {
    window.open(url, '_blank');
  };

  const renderImages = () => {
    if (images.length === 0) return null;

    return (
      <Grid container spacing={2}>
        {images.map(({ file, preview }, index) => (
          <Grid item xs={4} md={1} key={file.name}>
            <Box sx={{ position: 'relative', mt: '1rem', display: 'inline-block' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '-15px',
                  right: '0px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  aria-label="delete"
                  size="small"
                  sx={({ palette }) => ({
                    color: palette.error.main,
                  })}
                  onClick={() => handleImageRemove(index)}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
              <Image
                src={preview}
                alt={file.name}
                width={100}
                height={100}
                style={{ paddingRight: '1rem' }}
                onClick={() => openFullImage(preview)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
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
        <Button variant="contained" component="span" sx={{ mt: '1rem' }}>
          Upload a Photo
        </Button>
      </label>
      {error && <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>}
      {renderImages()}
      <Divider sx={{ my: 2 }} />
    </Grid>
  );
};

export default ImageUploadForm;
