import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import Form from './form';
import Upload from './upload';

const AdvertisementUpload = () => {
    return (
        <Card>
            <CardContent>
                <Upload />
                <Form />
            </CardContent>
        </Card>
    );
};

export default AdvertisementUpload;
