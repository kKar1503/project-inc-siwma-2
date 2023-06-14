import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import RegisterCompanyCard from './registerCompanyCard';
import BulkRegisterCompanyCard from './bulkRegisterCompanyCard';

const CompanyManagement = () => {
    return (
        <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
                <RegisterCompanyCard />
            </Box>
            <Box sx={{ flex: 1 }}>
                <BulkRegisterCompanyCard />
            </Box>
        </Box>
    );
};

export default CompanyManagement;
