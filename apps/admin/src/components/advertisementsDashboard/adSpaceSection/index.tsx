import AdSpaceTable, { DataType } from '@/components/advertisementsDashboard/adSpaceTable';
import Grid from '@mui/material/Grid';
import Debug from '@/components/Debug';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import InfoCard from '@/components/advertisementsDashboard/InfoCard';

const onDelete = (ids: readonly string[]) => {

};

const onEdit = (id: string) => {

};

const onSetActive = (ids: readonly string[]) => {

};

const onSetInactive = (ids: readonly string[]) => {

};

export interface AdvertisementDashboardProps {
  totalClicks: number;
  active: DataType[];
  inactive: DataType[];
}

const AdvertisementDashboard = ({ totalClicks, active, inactive }: AdvertisementDashboardProps) => {
  const initialized = active.length > 0 || inactive.length > 0;
  return (
    <Debug>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6} lg={6}>
          <Debug>
            <InfoCard title='Active Ad-Spaces' color='blue' icon={CampaignOutlinedIcon}
                      value={active.length.toString()} />
          </Debug>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Debug>
            <InfoCard title='Total Clicks' color='lightGreen' icon={AdsClickIcon} value={totalClicks.toString()} />
          </Debug>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {initialized &&
            <AdSpaceTable
              active
              rows={active}
              onDelete={onDelete}
              onEdit={onEdit}
              onChangeActiveStatus={onSetInactive}
            />
          }
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {initialized &&
            <AdSpaceTable
              active={false}
              rows={inactive}
              onDelete={onDelete}
              onEdit={onEdit}
              onChangeActiveStatus={onSetActive}
            />
          }
        </Grid>
      </Grid>
    </Debug>
  );


};

export default AdvertisementDashboard;

