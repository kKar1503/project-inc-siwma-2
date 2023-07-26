import React, { useState } from 'react';
import { Box, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchAdvertisements from '@/services/advertisements/fetchAdvertisements';
import Spinner from '@/components/fallbacks/Spinner';
import updateAdvertisement from '@/services/advertisements/updateAdvertisement';
import Form from './form';

const AdvertisementUpload = () => {

  const router = useRouter();
  const { id } = router.query;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const theme = useTheme();
  const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };


  const advertisementQuery = useQuery(['advertisement', id], () => fetchAdvertisements(id));


  if (!advertisementQuery.isSuccess) {
    return <Spinner />;
  }

  const advertisement = advertisementQuery.data[0];

  return (
    <Box
      marginLeft={isSmallOrMediumScreen ? 0 : '300px'}
      sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)' }}
    >
      <Card>
        <CardContent>
          <Box sx={{ marginBottom: '16px' }}>
            <Upload
              id='advetismetn image upload'
              title='Advertisement Image Upload'
              description='Select a JPG or PNG file to upload as an advertisement image.'
              selectedFile={selectedFile}
              changeHandler={handleFileChange}
              accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
              maxWidth='500px'
              maxHeight='500px'
              // maxFileSize={64 * 1024 * 1024} // 64MB in bytes
            />
          </Box>
          <Form advertisement={advertisement} onSubmit={(advertisement) => {
            updateAdvertisement(
              id as string,
              advertisement,
              selectedFile || undefined,
            );
          }} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdvertisementUpload;
