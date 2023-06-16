import React from 'react';
import AdSpaceTable from '@/components/advertisementsDashboard/adSpaceTable';
import { useQuery } from 'react-query';
import fetchAdSpaceData from '@/middlewares/fetchAdSpaceData';


const onDelete = (ids: readonly string[]) => {

};

const onEdit = (id: string) => {

};

const onSetActive = (ids: readonly string[]) => {

};

const onSetInactive = (ids: readonly string[]) => {

};

const useGetListingImagesQuery = () => {
  const { data } = useQuery('adSpace', async () => fetchAdSpaceData());
  return data;
};


const AdvertisementDashboard = () => {

  const apiData = useGetListingImagesQuery();


  return apiData
    ? (
      <>
        <AdSpaceTable
          active
          rows={apiData}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangeActiveStatus={onSetInactive}
        />
        <AdSpaceTable
          active={false}
          rows={apiData}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangeActiveStatus={onSetActive}
        />
      </>
    )
    : null;
};

export default AdvertisementDashboard;

