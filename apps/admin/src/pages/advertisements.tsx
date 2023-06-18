import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';
import useResponsiveness from '@inc/ui/dist/hook/useResponsiveness';
import Grid from '@mui/material/Grid';

const AdvertisementDashboard = () => {
  const [sm, md, lg] = useResponsiveness(['sm', 'md', 'lg']);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2} lg={2}>
        <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>NAVBAR</div>
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
        <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>
          <AdSpaceSection />
        </div>
      </Grid>
      <Grid item container xs={12} md={3} lg={3}>
        <Grid item xs={6} md={12} lg={12}>
          {/* Chart placeholder */}
          <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>CHART</div>
        </Grid>
        {/* Graph placeholder */}
        <Grid item xs={6} md={12} lg={12}>
          <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>GRAPH</div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdvertisementDashboard;

