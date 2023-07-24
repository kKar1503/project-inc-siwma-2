import React, { useEffect, useState } from 'react';
import { Company } from '@/utils/api/client/zod/companies';
import { useQuery } from 'react-query';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';
import fetchCompaniesCount from '@/middlewares/company-management/fetchCompaniesCount';
import Spinner from '@/components/fallbacks/Spinner';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CompanyTable from './companyTable';
import RegisterCompanyCard from './registerCompanyCard';
import BulkRegisterCompanyCard from './bulkRegisterCompanyCard';

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

const useGetCompaniesCountQuery = (lastIdPointer?: number) => {
  const { data, error, isError, isLoading } = useQuery(
    ['companies', lastIdPointer],
    async () => fetchCompaniesCount(lastIdPointer),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const countData = typeof data === 'number' ? data : undefined;

  return { countData, error, isError, isLoading };
};

const CompanyManagement = () => {
  const companies = useGetCompaniesQuery();
  const count = useGetCompaniesCountQuery();

  const [companiesData, setCompaniesData] = useState<Company[]>();
  const [totalCount, setTotalCount] = useState<number>();

  const handleCompaniesChange = async (companies: Company[], count: number) => {
    setCompaniesData(companies);
    setTotalCount(count);
  };

  useEffect(() => {
    if (companies.data && count.countData) {
      handleCompaniesChange(companies.data, count.countData);
    }
  }, [companies, count]);

  const updateCompanyData = async (lastIdPointer?: number, limit?: number) => {
    const updatedCompanies = await fetchCompanies(lastIdPointer, limit);
    const updatedCount = await fetchCompaniesCount(0);

    if (companies) {
      handleCompaniesChange(updatedCompanies, updatedCount);
    }
  };

  if (companies?.isLoading || count?.isLoading) {
    return <Spinner />;
  }

  if (companies?.isError || count?.isError) {
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
          {companiesData && totalCount && (
            <CompanyTable data={companiesData} count={totalCount} updateData={updateCompanyData} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyManagement;
