import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';

export interface LineGraphsProps {
  data: Array<{
    buying: number,
    selling: number,
  }>;
}

const LineGraph = ({ data }: LineGraphsProps) => {
  const formattedData = data.map((item, i) => {
      const x = i + 1;
      return {
        buying: {
          x,
          y: item.buying,
          label: `${item.buying}`,
        },
        selling: {
          x,
          y: item.selling,
          label: `${item.selling}`,
        },
      };
    },
  );
  return (
    <ModuleBase noFlex width='85%'>
      <VictoryChart
        theme={VictoryTheme.material}
        minDomain={{ y: 0 }}
      >
        <Title title='Number of buying and selling posts' />
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
          data={formattedData.map((item) => item.buying)}
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
                  mutation: ({ active }) => ({ active: !active }),
                },
              ],

            },
          }]}
          data={formattedData.map((item) => item.selling)}
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
        <VictoryLegend
          data={[
            { name: 'Buying', symbol: { fill: '#ee6e6d' } },
            { name: 'Selling', symbol: { fill: '#f3ca22' } },
          ]}
          x={280} y={250}
        />
      </VictoryChart>
    </ModuleBase>
  );
};


export default LineGraph;
