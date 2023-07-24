import React, { useEffect, useState } from 'react';
import { Company } from '@/utils/api/client/zod/companies';
import { useQuery } from 'react-query';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';
import Spinner from '@/components/fallbacks/Spinner';
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
  const { data, error, isError, isLoading } = useQuery(
    ['companies', lastIdPointer, limit],
    async () => fetchCompanies(lastIdPointer, limit),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return { data, error, isError, isLoading };
};

const CompanyManagement = () => {
  const companies = useGetCompaniesQuery();
  const count = companies.data?.count;
  const [companiesData, setCompaniesData] = useState<CompanyManagementProps>();

  const handleCompaniesChange = async (companies: CompanyManagementProps) => {
    setCompaniesData(companies);
  };

  useEffect(() => {
    if (companies.data) {
      handleCompaniesChange(companies.data);
    }
  }, [companies.data]);

  const updateCompanyData = async (lastIdPointer?: number, limit?: number) => {
    const updatedCompanies = await fetchCompanies(lastIdPointer, limit);

    if (companies) {
      handleCompaniesChange(updatedCompanies);
    }
  };

  if (companies?.isLoading) {
    return <Spinner />;
  }

  if (companies?.isError) {
    return (
      <div>
        An error occurred, please refresh the page try again
        <br />
        If the problem persists, please contact the administrator for assistance
      </div>
    );
  }

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
