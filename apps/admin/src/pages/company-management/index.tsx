import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CompanyTable from './companyTable';
import RegisterCompanyCard from './registerCompanyCard';
import BulkRegisterCompanyCard from './bulkRegisterCompanyCard';

const CompanyManagement = () => (
  <Container maxWidth="lg" sx={{ my: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <RegisterCompanyCard />
      </Grid>
      <Grid item xs={12} lg={6}>
        <BulkRegisterCompanyCard />
      </Grid>
      <Grid item xs={12}>
        <CompanyTable />
      </Grid>
    </Grid>
  </Container>
);

export default CompanyManagement;
