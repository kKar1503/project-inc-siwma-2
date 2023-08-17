import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NoInternetConnection from '@/components/NoInternet';

const AdvertisementDashboard = () => (
    <Box style={{
      marginTop: '1rem',
      marginRight: '1rem',
      marginLeft: '1rem',
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <AdSpaceSection totalClicks={0} />
        </Grid>
        {/* <Grid item container xs={12} md={3} spacing={2}> */}
        {/*  <Grid item xs={6} md={12}> */}
        {/*    <ClicksPie data={companyClicks} totalClicks={totalClicks} /> */}
        {/*  </Grid> */}
        {/*  <Grid item xs={6} md={12}> */}
        {/*    <ActiveGraph data={activeData} /> */}
        {/*  </Grid> */}
        {/* </Grid> */}
      </Grid>
      <NoInternetConnection />
    </Box>
  );

export default AdvertisementDashboard;

