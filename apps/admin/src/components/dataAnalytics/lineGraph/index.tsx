import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';

export interface LineGraphsProps {
  data: Array<{
    month: number;
    value: number;
    isBuying: boolean;
  }>;
}

const LineGraph = ({ data }: LineGraphsProps) => {
  const formattedData = data.map((item) => ({
      x: item.month,
      y: item.value,
      label: `${item.value}`,
      isBuying: item.isBuying,
    }),
  );
  return (
    <ModuleBase noFlex width='85%'>
      <VictoryChart
        theme={VictoryTheme.material}
      >
        <Title title='Number of Companies Buying and Selling' />
        <VictoryLine
          labelComponent={<VictoryTooltip />}
          style={{
            data: { stroke: '#ee6e6d', strokeWidth: 3 },
            parent: { border: '1rem solid #ccc' },
          }}
          events={[{
            target: 'parent',
            eventHandlers: {
              onClick: () => [
                {
                  target: 'labels',
                  mutation: ({ active }) => ({ active: !active }),
                },
              ],
            },
          }]}
          data={formattedData.filter((item) => item.isBuying)}
        />
        <VictoryLine
          labelComponent={<VictoryTooltip />}
          style={{
            data: { stroke: '#f3ca22', strokeWidth: 3 },
            parent: { border: '3px solid #ccc' },
          }}
          events={[{
            target: 'parent',
            eventHandlers: {
              onClick: () => [
                {
                  target: 'labels',
                  mutation: ({active}) => ({ active: !active }),
                },
              ],

            },
          }]}
          data={formattedData.filter((item) => !item.isBuying)}
        />
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
      </VictoryChart>
    </ModuleBase>
  );
};


export default LineGraph;
