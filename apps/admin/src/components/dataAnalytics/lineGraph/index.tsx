import { VictoryChart, VictoryLine, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';

export interface ActiveCategoriesProps {
  data: Array<{
    category: string;
    value: number;
  }>;
}

const LineGraph = () => {
  // const formattedData = data.map((item) => ({
  //       x: item.category,
  //       y: item.value,
  //       label: `${item.value}`,
  //     }),
  // );
  return (
    <ModuleBase noFlex>
      <VictoryChart
        theme={VictoryTheme.material}
      >
        <Title title="Number of Companies Buying and Selling" />
        <VictoryLine
          style={{
            data: { stroke: '#ee6e6d' },
            parent: { border: '1px solid #ccc'}
          }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 3 }
          ]}
        />
        <VictoryLine
          style={{
            data: { stroke: '#f3ca22' },
            parent: { border: '1px solid #ccc'}
          }}
          data={[
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 1, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
      </VictoryChart>
    </ModuleBase>
  );
};


export default LineGraph;
