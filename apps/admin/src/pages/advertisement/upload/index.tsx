import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import Form from './form';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';

const AdvertisementUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const theme = useTheme();
    const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <Box marginLeft={isSmallOrMediumScreen ? 0 : '300px'} sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)' }}>
            <Card>
                <CardContent>
                    <Box sx={{ marginBottom: '16px' }}>
                        <Upload
                            title="Advertisement Image Upload"
                            description="Select a JPG or PNG file to upload as an advertisement image."
                            selectedFile={selectedFile}
                            changeHandler={handleFileChange}
                            accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
                            maxWidth="500px"
                            maxHeight="500px"
                        />
                    </Box>
                    <Form />
                </CardContent>
            </Card>
        </Box>



    );
};

export default AdvertisementUpload;
