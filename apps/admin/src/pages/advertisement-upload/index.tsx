import React, { useState } from 'react';
import { Box, Card, CardContent } from '@mui/material';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import Form from './form';

const AdvertisementUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgURL, setImageURL] = useState<string>('');
  const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setImageURL(event.target.files[0].name);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Card>
        <CardContent>
          <Upload
            id="advetismetn image upload"
            title="Advertisement Image Upload"
            description="Select a JPG or PNG file to upload as an advertisement image."
            selectedFile={selectedFile}
            changeHandler={handleFileChange}
            accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
            maxWidth="500px"
            maxHeight="500px"
          />
        </CardContent>
        <Form imgURL={imgURL} />
      </Card>
    </Box>
  );
};

export default AdvertisementUpload;
