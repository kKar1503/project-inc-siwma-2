import React from 'react';
import AdSpaceTable from '@/components/advertisementsDashboard/adSpaceTable';
import { useQuery } from 'react-query';
import fetchAdSpaceData from '@/middlewares/fetchAdSpaceData';


const useGetListingImagesQuery = () => {
  const { data } = useQuery('adSpace', async () => fetchAdSpaceData());
  return data;
};


const AdvertisementDashboard = () => {

  const apiData = useGetListingImagesQuery();


  return (
    <div>
      <h1>Advertisement Dashboard</h1>
      {apiData ? <AdSpaceTable active rows={apiData} /> : null}
      {apiData ? <AdSpaceTable active={false} rows={apiData} /> : null}
    </div>
  );
};

export default AdvertisementDashboard;

