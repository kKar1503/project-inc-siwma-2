import React from 'react';
import AdSpaceTable from '@/components/advertisementsDashboard/adSpaceTable';
import { useQuery } from 'react-query';
import fetchAdSpaceData from '@/middlewares/fetchAdSpaceData';


const useGetListingImagesQuery = () => {
  const { data } = useQuery('listingImage', async () => fetchAdSpaceData() );
  return data || [];
};


const AdvertisementDashboard = () => {

  const data = useGetListingImagesQuery();

  return (
    <div>
      <h1>Advertisement Dashboard</h1>
      <AdSpaceTable active rows={data} />
      <AdSpaceTable active={false} rows={data}/>
    </div>
  );
};

export default AdvertisementDashboard;

