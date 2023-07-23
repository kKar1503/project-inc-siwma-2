import React, { useEffect, useState } from 'react';
import { Company } from '@/utils/api/client/zod/companies';
import { useQuery } from 'react-query';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CompanyTable from './companyTable';
import RegisterCompanyCard from './registerCompanyCard';
import BulkRegisterCompanyCard from './bulkRegisterCompanyCard';

export type CompanyManagementProps = {
  data: Company[];
  count: number;
};

const useGetCompaniesQuery = (lastIdPointer?: number, limit?: number) => {
  const { data } = useQuery(
    ['companies', lastIdPointer, limit],
    async () => fetchCompanies(lastIdPointer, limit),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return data;
};

const CompanyManagement = () => {
  const companies = useGetCompaniesQuery();
  const count = companies?.count;
  const [companiesData, setCompaniesData] = useState<CompanyManagementProps>();

  const handleCompaniesChange = async (companies: CompanyManagementProps) => {
    setCompaniesData(companies);
  };

  useEffect(() => {
    if (companies) {
      handleCompaniesChange(companies);
    }
  }, [companies]);

  const updateCompanyData = async (lastIdPointer?: number, limit?: number) => {
    const updatedCompanies = await fetchCompanies(lastIdPointer, limit);

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
          {companiesData && (
            <CompanyTable data={companiesData} count={count} updateData={updateCompanyData} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyManagement;
