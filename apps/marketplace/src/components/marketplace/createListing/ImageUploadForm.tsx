import React, { useState, useRef, useEffect } from 'react';
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
  file?: File;
  id?: string;
  preview: string;
};

export type Order = {
  [key: string]: number;
};

export type SetImageProps = {
  setImages: (parameters: Blob[]) => void;
  imagesData: PreviewImageProps[];
  setOrder: (parameters: Order) => void;
  setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const ImageUploadForm = ({ setImages, imagesData, setOrder, setDeletedImages }: SetImageProps) => {
  const [images, setPreivewImages] = useState<PreviewImageProps[]>([]);
  const [error, setError] = useState('');

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    setPreivewImages(imagesData);
  }, [imagesData]);

  useEffect(() => {
    const order: Order = {};
    images.forEach((image, index) => {
      if (image.file) {
        order[image.file.name] = index;
      }
      if (image.id) {
        order[image.id] = index;
      }
    });
    setOrder(order);
  }, [images, setOrder]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreivewImages(images.filter((item) => item.file === undefined));
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
    setPreivewImages((prevImages) => [...prevImages, ...previewImages].slice(0, 10));

    setImages(imageFiles);

    setError('');
  };

  const handleImageRemove = (index: number) => {
    if (images[index].id !== undefined) {
      setDeletedImages((prevData: string[]) => [...prevData, index.toString()]);
    }
    setPreivewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const openFullImage = (url: string) => {
    window.open(url, '_blank');
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    e.dataTransfer.effectAllowed = 'move';
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const copyItems = [...images];
    if (dragItem.current === null) return false;
    if (dragOverItem.current === null) return false;

    const dragItemContent = copyItems[dragItem.current];
    copyItems.splice(dragItem.current, 1);
    copyItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setPreivewImages(copyItems);
    return true;
  };

  const renderImages = () => {
    if (images.length === 0) return null;

    return (
      <Grid container spacing={2} onDrop={drop}>
        {images.map(({ file, preview, id }, index) => (
          <Grid
            draggable
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={drop}
            item
            xs={2}
            md={1}
            key={file?.name || id}
          >
            <Box position="relative" mt="1rem">
              <Image
                src={preview}
                alt={file?.name || preview}
                width={100}
                height={100}
                style={{ paddingRight: '1rem' }}
                onClick={() => openFullImage(preview)}
              />
              <IconButton
                aria-label="delete"
                size="small"
                sx={({ palette }) => ({
                  position: 'absolute',
                  top: -15,
                  right: -20,
                  color: palette.primary.main,
                  bgcolor: palette.common.white,
                })}
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
