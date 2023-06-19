import AdSpaceTable from '@/components/advertisementsDashboard/adSpaceTable';
import { useQuery } from 'react-query';
import fetchAdSpaceData from '@/middlewares/fetchAdSpaceData';
import Grid from '@mui/material/Grid';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import Debug from '@/components/Debug';

const onDelete = (ids: readonly string[]) => {

};

const onEdit = (id: string) => {

};

const onSetActive = (ids: readonly string[]) => {

};

const onSetInactive = (ids: readonly string[]) => {

};

const useGetAdSpaceDataQuery = () => {
  const { data } = useQuery('adSpace', async () => fetchAdSpaceData());
  return data;
};


const AdvertisementDashboard = () => {

  const apiData = useGetAdSpaceDataQuery();

  if (!apiData) return null;

  const { data, totalClicks } = apiData;

  const active = data.filter((item) => item.active);
  const inactive = data.filter((item) => !item.active);

  return (
    <Debug>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6} lg={6}>
          <Debug>
            <div style={{ width: '100%', height: '2em' }} />
            {/* <AdminCard title='Active Ad-Spaces' color='blue' icon={CampaignOutlinedIcon} value={active.length.toString()}/> */}
          </Debug>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Debug>
            <div style={{ width: '100%', height: '2em' }} />
            {/* <AdminCard title='Total Clicks' color='lightGreen' icon={AdsClickIcon} value={totalClicks.toString()} /> */}
          </Debug>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <AdSpaceTable
            active
            rows={active}
            onDelete={onDelete}
            onEdit={onEdit}
            onChangeActiveStatus={onSetInactive}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <AdSpaceTable
            active={false}
            rows={inactive}
            onDelete={onDelete}
            onEdit={onEdit}
            onChangeActiveStatus={onSetActive}
          />
        </Grid>
      </Grid>
    </Debug>
  );


};

export default AdvertisementDashboard;

