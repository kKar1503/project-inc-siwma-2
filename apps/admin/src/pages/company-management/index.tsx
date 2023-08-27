import React, { useEffect, useState } from 'react';
import { User } from '@/utils/api/client/zod/users';
import { Company } from '@/utils/api/client/zod/companies';
import { useQuery } from 'react-query';
import fetchUsers from '@/middlewares/fetchUsers';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';
import fetchCompaniesCount from '@/middlewares/company-management/fetchCompaniesCount';
import Spinner from '@/components/fallbacks/Spinner';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CompanyTable from '@/components/tables/BaseTable/CompanyTable';
import RegisterCompanyCard from '@/components/cards/RegisterCompanyCard';
import BulkRegisterCompanyCard from '@/components/cards/BulkRegisterCompanyCard';

export type CompanyWithEmails = Company & {
  emails: string[];
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

const useGetUsersQuery = () => {
  const { data, error, isError, isLoading } = useQuery('users', async () => fetchUsers(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, error, isError, isLoading };
};

const CompanyManagement = () => {
  const companies = useGetCompaniesQuery();
  const count = useGetCompaniesCountQuery();
  const users = useGetUsersQuery();

  const [companiesData, setCompaniesData] = useState<CompanyWithEmails[]>();
  const [totalCount, setTotalCount] = useState<number>();
  const [usersData, setUsersData] = useState<User[]>();

  const processUserData = (usersData: User[], companiesData: Company[]) => {
    const companiesWithEmails = companiesData.map((company) => {
      const usersInCompany = usersData.filter((user) => user.company.id === company.id);
      const emails = usersInCompany.map((user) => user.email);
      return {
        ...company,
        emails,
      };
    });

    return companiesWithEmails;
  };

  const handleCompaniesChange = async (companies: Company[], count: number, users: User[]) => {
    if (companies && count && users) {
      const processedData = processUserData(users, companies);
      setCompaniesData(processedData);
      setTotalCount(count);
      setUsersData(users);
    }
  };

  useEffect(() => {
    if (companies.data && count.countData && users.data) {
      handleCompaniesChange(companies.data, count.countData, users.data);
    }
  }, [companies, count, users]);

  const updateCompanyData = async (lastIdPointer?: number, limit?: number) => {
    const updatedCompanies = await fetchCompanies(lastIdPointer, limit);
    const updatedCount = await fetchCompaniesCount(0);
    const updatedUsers = await fetchUsers();

    if (companies && count && users) {
      handleCompaniesChange(updatedCompanies, updatedCount, updatedUsers);
    }
  };

  if (companies?.isLoading || count?.isLoading || users?.isLoading) {
    return <Spinner />;
  }

  if (companies?.isError || count?.isError || users?.isError) {
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
          {companiesData && totalCount && usersData && (
            <CompanyTable data={companiesData} count={totalCount} updateData={updateCompanyData} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyManagement;
