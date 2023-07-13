import { VictoryAxis, VictoryChart, VictoryLine, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
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
    <ModuleBase noFlex width='85%'>
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
        <VictoryAxis
          theme={VictoryTheme.material}
          tickValues={[1,2,3,4,5,6,7,8,9,10,11,12]}
          tickFormat={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}
          style={{
            ticks:
              {
                stroke: 'none',
              },
            tickLabels:
              {
                fontSize: 10,
                padding: 5,
              },
          }}
        />
      </VictoryChart>
    </ModuleBase>
  );
};


export default LineGraph;
