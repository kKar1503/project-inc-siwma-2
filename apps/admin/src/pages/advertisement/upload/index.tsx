import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import Form from './form';
import Upload, { FileUploadProps } from '../../../components/FileUpload/FileUploadBase';

const AdvertisementUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <Box marginLeft={isSmallScreen ? 0 : '300px'}>
            <Card>
                <CardContent>
                    <Upload
                        title="Advertisement Image Upload"
                        description="Select a JPG or PNG file to upload as an advertisement image."
                        selectedFile={selectedFile}
                        changeHandler={handleFileChange}
                    />
                    <Form />
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdvertisementUpload;
