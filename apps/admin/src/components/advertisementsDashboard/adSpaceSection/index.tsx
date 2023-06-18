import AdSpaceTable from '@/components/advertisementsDashboard/adSpaceTable';
import { useQuery } from 'react-query';
import fetchAdSpaceData from '@/middlewares/fetchAdSpaceData';
import Box from '@mui/material/Box';
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
  const [sm, md, lg] = useResponsiveness(['sm', 'md', 'lg']);

  if (!apiData) return null;

  const { data, totalClicks } = apiData;

  const active = data.filter((item) => item.active);
  const inactive = data.filter((item) => !item.active);

  return (
    <Debug>
      <Box style={{}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Debug>
            <div style={{ width: '50%', height: '2em' }} />
          </Debug>
          <Debug>
            <div style={{ width: '50%', height: '2em' }} />
          </Debug>
          {/* <AdminCard title='Active Ad-Spaces' color='blue' icon={CampaignOutlinedIcon} value={active.length.toString()}/> */}
          {/* <AdminCard title='Total Clicks' color='lightGreen' icon={AdsClickIcon} value={totalClicks.toString()} /> */}
        </div>
        <AdSpaceTable
          active
          rows={active}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangeActiveStatus={onSetInactive}
        />
        <AdSpaceTable
          active={false}
          rows={inactive}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangeActiveStatus={onSetActive}
        />
      </Box>
    </Debug>
  );
};

export default AdvertisementDashboard;

