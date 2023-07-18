import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

const BulkRegisterCompanyCard = () => {
    return (
        <Card sx={{ elevation: 10, boxShadow: 9 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Bulk register companies
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Register multiple companies through a file upload
                </Typography>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Button variant="outlined" color="primary" fullWidth>
                        BULK REGISTER COMPANIES
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BulkRegisterCompanyCard;