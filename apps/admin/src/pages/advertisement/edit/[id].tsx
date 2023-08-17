import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchAdvertisements from '@/services/advertisements/fetchAdvertisements';
import Spinner from '@/components/fallbacks/Spinner';
import updateAdvertisement from '@/services/advertisements/updateAdvertisement';
import AdvertisementForm from '@/components/advertisementsDashboard/edit/form';
import { PostAdvertisementRequestBody } from '@/utils/api/server/zod';
import fetchCompanies from '@/services/companies/fetchCompanies';

const validate = (values: PostAdvertisementRequestBody): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  const startDate = new Date(values.startDate || '');
  const endDate = new Date(values.endDate || '');


  if (startDate > endDate) {
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

const AdvertisementUpload = () => {
  const router = useRouter();
  const { id } = router.query;

  const advertisementQuery = useQuery(['advertisement', id], () => fetchAdvertisements(id));

  const companyQuery = useQuery('companies', companiesQuery);

  if (!advertisementQuery.isSuccess || !companyQuery.isSuccess) {
    return <Spinner />;
  }

  const advertisement = advertisementQuery.data[0];

  return (
    <Box
      sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)' }}
    >
      <Card>
        <CardContent>
          <AdvertisementForm advertisement={advertisement}
                             validate={validate}
                             companyDict={companyQuery.data}
                             onSubmit={async (advertisement: PostAdvertisementRequestBody, selectedFile: File | undefined) => {
                               const result = await updateAdvertisement(
                                 id as string,
                                 {
                                   ...advertisement,
                                   startDate: new Date(advertisement.startDate || '').toISOString(),
                                   endDate: new Date(advertisement.endDate || '').toISOString(),
                                 },
                                 selectedFile,
                               );
                               return !!result;
                             }} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdvertisementUpload;
