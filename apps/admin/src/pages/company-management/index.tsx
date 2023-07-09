import React from 'react';
import { useQuery } from 'react-query';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CompanyTable from './companyTable';
import RegisterCompanyCard from './registerCompanyCard';
import BulkRegisterCompanyCard from './bulkRegisterCompanyCard';

const useGetCompaniesQuery = () => {
  const { data } = useQuery('companies', fetchCompanies);

  return data;
};

const CompanyManagement = () => {
  const companies = useGetCompaniesQuery();

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <RegisterCompanyCard />
        </Grid>
        <Grid item xs={6}>
          <BulkRegisterCompanyCard />
        </Grid>
        <Grid item xs={12}>
          {companies && <CompanyTable data={companies} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyManagement;
