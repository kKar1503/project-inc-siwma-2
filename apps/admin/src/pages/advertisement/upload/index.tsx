import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Form from './form';
import Upload, { FileUploadProps } from './upload';

export enum AcceptedFileTypes {
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    TXT = 'text/plain',
    CSV = 'text/csv',
    PDF = 'application/pdf',
    DOC = 'application/msword',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

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
                {/* <Typography variant="h4" sx={{ mb: 2 }}>
                    Advertisement Upload
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Import a JPG or PNG file to upload an advertisement
                </Typography> */}
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
