import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchAdvertisements from '@/services/advertisements/fetchAdvertisements';
import Spinner from '@/components/fallbacks/Spinner';
import updateAdvertisement from '@/services/advertisements/updateAdvertisement';
import Index from '@/components/advertisementsDashboard/edit/form';

const AdvertisementUpload = () => {
  const router = useRouter();
  const { id } = router.query;

  const advertisementQuery = useQuery(['advertisement', id], () => fetchAdvertisements(id));


  if (!advertisementQuery.isSuccess) {
    return <Spinner />;
  }

  const advertisement = advertisementQuery.data[0];

  return (
    <Box
      sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)' }}
    >
      <Card>
        <CardContent>
          <Index advertisement={advertisement} onSubmit={async (advertisement, selectedFile) => {
            const result = await updateAdvertisement(
              id as string,
              advertisement,
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
