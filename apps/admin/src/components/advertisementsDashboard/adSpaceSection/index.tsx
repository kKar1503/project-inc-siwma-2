import AdSpaceTable from '@/components/advertisementsDashboard/adSpaceTable';
import { useQuery } from 'react-query';
import fetchAdSpaceData from '@/middlewares/fetchAdSpaceData';
import Box from '@mui/material/Box';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

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
  const [sm,md,lg] = useResponsiveness(['sm','md','lg']);

  if (!apiData) return null;

  const { data,totalClicks } = apiData;

  const active = data.filter((item) => item.active);
  const inactive = data.filter((item) => !item.active);

  return (
    <Box style={{
    }}>
      <div style={{ border: '1px solid red' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ border: '1px solid red',width:'50%',height:'2em' }}/>
          <div style={{ border: '1px solid red',width:'50%',height:'2em' }}/>
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
      </div>
    </Box>
  );
};

export default AdvertisementDashboard;

