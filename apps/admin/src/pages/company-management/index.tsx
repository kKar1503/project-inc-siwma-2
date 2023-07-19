import React, { useEffect, useState } from 'react';
import { Company } from '@/utils/api/client/zod/companies';
import { useQuery } from 'react-query';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';
import CompanyTable from './companyTable';
import RegisterCompanyCard from './registerCompanyCard';
import BulkRegisterCompanyCard from './bulkRegisterCompanyCard';

const useGetCompaniesQuery = () => {
  const { data } = useQuery('companies', async () => fetchCompanies(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return data;
};

const CompanyManagement = () => {
  const companies = useGetCompaniesQuery();
  const [companiesData, setcompaniesData] = useState<Company[]>();

  const handleCompaniesChange = async (companies: Company[]) => {
    setcompaniesData(companies);
  };

  useEffect(() => {
    if (companies) {
      handleCompaniesChange(companies);
    }
  }, [companies]);

  const updateCompanyData = async () => {
    const updatedCompanies = await fetchCompanies();

    if (companies) {
      handleCompaniesChange(updatedCompanies);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <RegisterCompanyCard updateData={updateCompanyData} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <BulkRegisterCompanyCard updateData={updateCompanyData} />
        </Grid>
        <Grid item xs={12}>
          <CompanyTable data={companiesData} updateData={updateCompanyData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyManagement;
