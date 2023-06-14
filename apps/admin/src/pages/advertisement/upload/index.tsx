import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Form from './form';
import Upload from './upload';

const AdvertisementUpload = () => {
    return (
        <Box>
            <Card>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Advertisement Upload
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Import a JPG or PNG file to upload an advertisement
                </Typography>
                <CardContent>
                    <Upload />
                    <Form />
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdvertisementUpload;