import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';

const data = [
  { month: 1, adSpaces: 5, label: '5' },
  { month: 2, adSpaces: 1, label: '1'  },
  { month: 3, adSpaces: 2 , label: '2' },
  { month: 4, adSpaces: 4 , label: '4' },
  { month: 5, adSpaces: 4 , label: '4' },
  { month: 6, adSpaces: 2 , label: '2' },
  { month: 7, adSpaces: 4 , label: '4' },
  { month: 8, adSpaces: 2 , label: '2' },
  { month: 9, adSpaces: 3 , label: '3' },
  { month: 10, adSpaces: 4, label: '4'  },
  { month: 11, adSpaces: 0 , label: '0' },
  { month: 12, adSpaces: 0 , label: '0' },
];

const ExampleGraph = () => (
  <ModuleBase>
    <Title title='Number of active ad-spaces per month' subtitle='Year 2022' />
    <VictoryChart
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={20}
    >
      <VictoryAxis
        theme={VictoryTheme.material}
        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        tickFormat={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
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
      <VictoryAxis
        theme={VictoryTheme.material}
        dependentAxis
        tickFormat={x => x.toFixed(1)}
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
      <VictoryBar
        barRatio={0.8}
        data={data}
        x='month'
        y='adSpaces'
        labelComponent={<VictoryTooltip />}
        events={[{
          target: 'data',
          eventHandlers: {
            onMouseOver: () => [
              {
                target: 'labels',
                mutation: () => ({ active: true }),
              },
              {
                target: 'data',
                mutation: () => ({ style: { fill: '#ea3b59' } }),
              },
            ],
            onMouseOut: () => [
              {
                target: 'data',
                mutation: () => ({ style: undefined }),
              },
              {
                target: 'labels',
                mutation: () => ({ active: false }),
              },
            ],
          },
        }]}
        style={{
          data: {
            fill: '#d7d7d7',
          },
        }}
        cornerRadius={{ top: 7, bottom: 7 }}
      />
    </VictoryChart>
  </ModuleBase>
  );

export default ExampleGraph;
