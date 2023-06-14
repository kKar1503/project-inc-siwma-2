import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

const RegisterCompanyCard = () => {
    return (
        <Card sx={{ elevation: 10, boxShadow: 9 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Register an individual company
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Register an individual company profile into the system
                </Typography>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Button variant="outlined" color="primary" fullWidth>
                        Register Company
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RegisterCompanyCard;
