import { VictoryContainer, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';

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
      {/* idk why but the other graphs have a small spacing at the top but this doesn't so im adding this for consistency */}
      <br/>
      <Title title={`${title} (${formattedData.length})`} primarySize={20} x={-35} />
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
    </ModuleBase>
  );
};


export default PieChart;
