import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import AdvertisementForm from '@/components/advertisementsDashboard/edit/form';
import { PostAdvertisementRequestBody } from '@/utils/api/server/zod';
import createAdvertisement from '@/services/advertisements/createAdvertisement';
import { useQuery } from 'react-query';
import fetchCompanies from '@/services/companies/fetchCompanies';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';

const validate = (values: PostAdvertisementRequestBody): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  const { link, description, startDate, endDate, active, companyId } = values;

  // Company validation
  if (!companyId || companyId === '') {
    errors.companyId = 'Please select a company';
  }

  // Date validation
  const startDateObject = new Date(startDate || '');
  const endDateObject = new Date(endDate || '');
  if (startDateObject > endDateObject) {
    errors.endDate = 'End date must be after the start date';
    errors.startDate = 'Start date must be before the end date';
  }
  return errors;
};

const companiesQuery = async () => {
  const companies = await fetchCompanies();
  // mapping stuff
  const idToName: { [key: string]: string } = {};
  companies.forEach((company) => {
    idToName[company.id] = company.name;
  });
  return idToName;
};

const onSubmit = async (advertisement: PostAdvertisementRequestBody, selectedFile: File | undefined) => {
  const result = await createAdvertisement(
    {
      ...advertisement,
      startDate: new Date(advertisement.startDate || '').toISOString(),
      endDate: new Date(advertisement.endDate || '').toISOString(),
    },
    selectedFile,
  );
  return !!result;
};

const AdvertisementUpload = () => {
  const companyQuery = useQuery('companies', companiesQuery);

  if (!companyQuery.isSuccess) {
    return <SpinnerPage />;
  }

  return (
    <Box
      sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)' }}
    >
      <Card>
        <CardContent>
          <AdvertisementForm validate={validate}
                             onSubmit={onSubmit}
                             companyDict={companyQuery.data || {}}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdvertisementUpload;
