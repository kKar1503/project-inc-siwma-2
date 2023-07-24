import { VictoryContainer, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';
import Grid from '@mui/material/Grid';

export interface ActiveCategoriesProps {
  data: Array<{
    name: string;
    total: number;
  }>;
  title: string;
}

const PieChart = ({ data,title }: ActiveCategoriesProps) => {
  const formattedData = data.map((item) => ({
      x: item.name,
      y: item.total,
      label: `${item.name}\n${item.total}`,
    }),
  );
  return (
    <ModuleBase noFlex width='85%'>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={1} />
        <Grid item xs={11}>
          <Title title={title} primarySize={20} x={-35} />
          <VictoryPie
            containerComponent={<VictoryContainer />}
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
        </Grid>
      </Grid>
    </ModuleBase>
  );
};


export default PieChart;
