import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';

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
    <VictoryChart
      labelComponent={<VictoryTooltip/>}
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={20}
    >
      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        tickFormat={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={x => x.toFixed(1)}
      />
      <VictoryBar
        data={data}
        x='month'
        y='adSpaces'
      />
    </VictoryChart>
  </ModuleBase>
  );

export default ExampleGraph;
