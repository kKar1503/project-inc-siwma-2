import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Form from './form';
import Upload, { FileUploadProps } from '../../../components/FileUpload/FileUploadBase';
const AdvertisementUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <Box>
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
