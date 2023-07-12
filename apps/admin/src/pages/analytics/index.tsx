import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Debug from '@/components/Debug';
import TopCategories from '@/components/dataAnalytics/topCategories';
import TopCompanies from '@/components/dataAnalytics/topCompanies';
import ActiveCategories from '@/components/dataAnalytics/activeCategories';
import LineGraph from '@/components/dataAnalytics/lineGraph';

const Analytics = () => {
  const topCategories = [18, 33, 12, 12, 25, 14, 12, 33];
  const topCompanies = [18, 17, 12, 11, 25, 14, 24, 5];
  const activeCategories = [
    { category: 'Cat 2', value: 33 },
    { category: 'Cat 3', value: 12 },
    { category: 'Cat 4', value: 12 },
    { category: 'Cat 1', value: 18 },
  ];
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
          <Debug>
            <Grid container item xs={12}>
              <Grid container item xs={12}>
                <h1>Company</h1>
              </Grid>
              <Grid container item xs={6} md={3}>
                <TopCompanies data={topCompanies} />
              </Grid>
              <Grid container item xs={6} md={3}>
                <TopCompanies data={topCompanies} />
              </Grid>
              <Grid container item xs={12} md={3}>
                <LineGraph />
              </Grid>
            </Grid>

            <Grid container item xs={12}>
              <Grid container item xs={12}>
                <h1>Settlement</h1>
              </Grid>

              <Grid container item xs={6} md={3}>
                <Debug>
                  <TopCategories data={topCategories} type='Selling' year={2022} />
                </Debug>
              </Grid>
              <Grid container item xs={6} md={3}>
                <Debug>
                  <TopCategories data={topCategories} type='Buying' year={2022} />
                </Debug>
              </Grid>
              <Grid container item xs={12} md={3}>
                <Debug>
                  <ActiveCategories data={activeCategories} />
                </Debug>
              </Grid>
            </Grid>
          </Debug>
        </Grid>
      </Grid>
    </Box>
  );
};


export default Analytics;
