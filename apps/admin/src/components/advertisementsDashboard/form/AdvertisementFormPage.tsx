import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { useQueries } from 'react-query';
import fetchAdvertisements from '@/services/advertisements/fetchAdvertisements';
import Spinner from '@/components/fallbacks/Spinner';
import updateAdvertisement from '@/services/advertisements/updateAdvertisement';
import AdvertisementForm from 'src/components/advertisementsDashboard/form';
import { PostAdvertisementRequestBody } from '@/utils/api/server/zod';
import fetchCompanies from '@/services/companies/fetchCompanies';
import createAdvertisement from '@/services/advertisements/createAdvertisement';
import { useRouter } from 'next/router';

const companiesQuery = async () => {
  const companies = await fetchCompanies();
  // mapping stuff
  const idToName: { [key: string]: string } = {};
  companies.forEach((company) => {
    idToName[company.id] = company.name;
  });
  return idToName;
};
const advertisementsQuery = async (id:string) => {
  const advertisements = await fetchAdvertisements(id);
  return advertisements[0];
};


const AdvertisementFormPage = ({ edit }: { edit: string | false }) => {
  const router = useRouter();
  const isEdit = edit !== false;
  const id = isEdit ? edit : '';

  const [advertisementQuery, companyQuery] = useQueries([
    {
      queryKey: ['advertisement', id],
      queryFn: () => advertisementsQuery(id),
      enabled: isEdit && id !== undefined,
      refetchOnWindowFocus: false,
    },
    {
      queryKey: 'companies',
      queryFn: companiesQuery,
      refetchOnWindowFocus: false,
    },
  ]);

  if (isEdit && advertisementQuery.isError) {
    router.push('/404');
  }

  if (!companyQuery.isSuccess || (isEdit && !advertisementQuery.isSuccess)) {
    return <Spinner />;
  }

  const onSubmit = async (advertisement: PostAdvertisementRequestBody, selectedFile: File | undefined) => {
    const data = {
      ...advertisement,
      startDate: new Date(advertisement.startDate || '').toISOString(),
      endDate: new Date(advertisement.endDate || '').toISOString(),
    };
    await (isEdit
      ? updateAdvertisement(
        id,
        data,
        selectedFile,
      )
      : createAdvertisement(
        data,
        selectedFile,
      ));
  };


  return (
    <Box
      sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)' }}
    >
      <Card>
        <CardContent>
          <AdvertisementForm advertisement={advertisementQuery?.data}
                             companyDict={companyQuery.data}
                             onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdvertisementFormPage;
