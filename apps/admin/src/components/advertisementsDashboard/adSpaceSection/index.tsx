import AdSpaceTable, { DataType } from '@/components/advertisementsDashboard/adSpaceTable';
import Grid from '@mui/material/Grid';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import InfoCard from '@/components/advertisementsDashboard/InfoCard';

const onDelete = (ids: readonly DataType[]) => {

};

const onEdit = (id: DataType) => {

};

const onSetActive = (ids: readonly DataType[]) => {

};

const onSetInactive = (ids: readonly DataType[]) => {

};

export interface AdvertisementDashboardProps {
  totalClicks: number;
  adspace: DataType[];
}

const AdvertisementDashboard = ({ totalClicks, adspace }: AdvertisementDashboardProps) => {
  const initialized = adspace.length > 0;
  const active = adspace.filter((item) => item.active);
  return (
      <Grid container spacing={2}>
        <Grid item xs={6} md={6} lg={6}>
            <InfoCard title='Active Ad-Spaces' color='blue' icon={CampaignOutlinedIcon}
                      value={active.length.toString()} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
            <InfoCard title='Total Clicks' color='lightGreen' icon={AdsClickIcon} value={totalClicks.toString()} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {initialized &&
            <AdSpaceTable
              rows={adspace}
              onDelete={onDelete}
              onEdit={onEdit}
              onSetActive={onSetActive}
              onSetInactive={onSetInactive}
            />
          }
        </Grid>
      </Grid>
  );


};

export default AdvertisementDashboard;

