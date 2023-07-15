import { VictoryContainer, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';
import Grid from '@mui/material/Grid';

export interface ActiveCategoriesProps {
  data: Array<{
    category: string;
    value: string;
  }>;
}

const ActiveCategories = ({ data }: ActiveCategoriesProps) => {
  const formattedData = data.map((item) => ({
      x: item.category,
      y: item.value,
      label: `${item.category}\n${item.value}`,
    }),
  );
  return (
    <ModuleBase noFlex width='85%'>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={1} />
        <Grid item xs={11}>
          <VictoryContainer>
              <Title title='Active Categories' />
              <VictoryPie
                standalone={false}
                // origin={}
                labelComponent={<VictoryTooltip />}
                theme={VictoryTheme.material}
                events={[{
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => [
                      {
                        target: 'labels',
                        mutation: () => ({ active: true }),
                      },
                    ],
                    onMouseOut: () => [
                      {
                        target: 'labels',
                        mutation: () => ({ active: false }),
                      },
                    ],
                  },
                }]}
                data={formattedData}
              />
          </VictoryContainer>
        </Grid>
      </Grid>
    </ModuleBase>
  );
};


export default ActiveCategories;
