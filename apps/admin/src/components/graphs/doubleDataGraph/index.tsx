import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLegend,
  VictoryPortal,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';

export interface DataGraphElement {
  id: number;
  value: number;
  label: string;
}

export interface DataGraphFormatElement {
  id: number;
  display: string;
}

export interface DataGraphProps {
  data1: DataGraphElement[];
  data2: DataGraphElement[];
  format: Array<DataGraphFormatElement | string>;
  style: {
    fillColor: string;
    fillColor2: string;
    hoverColor: string;
    hoverColor2: string;
  };

  children?: ReactNode;
  legend?: [string, string];
}

const DoubleDataGraph = ({ data1, data2, format, style, children, legend }: DataGraphProps) => {
  const tickValues = format.map((item, index) => typeof item === 'string' ? index + 1 : item.id);
  const tickFormat = format.map((item) => typeof item === 'string' ? item : item.display);


  return (
    <Box sx={{ height: '100%' }}>
      <VictoryChart
        containerComponent={<VictoryContainer />}
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={20}
        height={350}
        width={350}
      >
        {children}
        <VictoryAxis
          theme={VictoryTheme.material}
          tickValues={tickValues}
          tickFormat={tickFormat}
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
          barRatio={0.4}
          data={data1.map((item) => ({ ...item, id: item.id + 0.15 }))} // offset the bars
          x='id'
          y='value'
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
                  mutation: () => ({ style: { fill: style.hoverColor } }),
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
              fill: style.fillColor,
            },
          }}
          cornerRadius={{ top: 9, bottom: 9 }}
        />
        <VictoryBar
          barRatio={0.4}
          data={data2.map((item) => ({ ...item, id: item.id - 0.15 }))} // offset the bars
          x='id'
          y='value'
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
                  mutation: () => ({ style: { fill: style.hoverColor2 } }),
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
              fill: style.fillColor2,
            },
          }}
          cornerRadius={{ top: 9, bottom: 9 }}
        />
        {legend &&
          <VictoryPortal>
            <VictoryLegend
              data={[
                { name: legend[0], symbol: { fill: style.fillColor } },
                { name: legend[1], symbol: { fill: style.fillColor2 } },
              ]}
              x={290} y={245}
            />
          </VictoryPortal>}
      </VictoryChart>
    </Box>
  );
};

export default DoubleDataGraph;
