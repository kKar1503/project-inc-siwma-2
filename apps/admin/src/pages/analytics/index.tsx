import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Debug from '@/components/Debug';

const Analytics = () => {
  return (
    <Box style={{
      marginTop: '1rem',
      marginRight: '1rem',
      marginLeft: '1rem',
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Debug>NAVBAR</Debug>
        </Grid>
        <Grid container item xs={12} md={10}>
          <Grid container item xs={12}>
            <Grid container item xs={12}>
              <h1>Company</h1>
            </Grid>
            <Grid container item xs={6} md={3}>
              top companies
            </Grid>
            <Grid container item xs={6} md={3}>
              top companies
            </Grid>
            <Grid container item xs={12} md={3}>
              line graph thing
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Grid container item xs={12}>
              <h1>Settlement</h1>

            </Grid>

            <Grid container item xs={6} md={3}>
              graph 1
            </Grid>
            <Grid container item xs={6} md={3}>
              graph 2
            </Grid>
            <Grid container item xs={12} md={3}>
              pie chart thing
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};


export default Analytics;
