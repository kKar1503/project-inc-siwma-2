import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLegend,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';
import { ReactNode } from 'react';

export interface DataGraphElement {
  id: number;
  value: number;
  label: string;
  isSecondary: boolean;
}

export interface DataGraphFormatElement {
  id: number;
  display: string;
}

export interface DataGraphProps {
  data: DataGraphElement[];
  format: Array<DataGraphFormatElement>;
  style: {
    fillColor: string;
    fillColor2: string;
    hoverColor: string;
    hoverColor2: string;
  };

  children?: ReactNode;
  legend?: [string, string];
}

const DoubleDataGraph = ({ data, format, style, children, legend }: DataGraphProps) => {
  const tickValues = format.map((item) => item.id);
  const tickFormat = format.map((item) => item.display);
  const primaryData = data.filter((item) => !item.isSecondary).map(i => ({
    id: i.id + 0.15,
    value: i.value,
    label: i.label,
  }));
  const secondaryData = data.filter((item) => item.isSecondary).map(i => ({
    id: i.id - 0.15,
    value: i.value,
    label: i.label,
  }));

  return (
    <VictoryContainer>
      <VictoryChart
        standalone={false}
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={20}
        height={400}
        width={400}
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
          barRatio={0.4 }
          data={primaryData}
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
                  mutation: () => ({ style: { fill: style.hoverColor} }),
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
          cornerRadius={{ top: 10, bottom: 10 }}
        />
        <VictoryBar
          barRatio={0.4}
          data={secondaryData}
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
                  mutation: () => ({ style: { fill: style.hoverColor2} }),
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
          cornerRadius={{ top: 10, bottom: 10 }}
        />
        {legend && <VictoryLegend
          data={[
            { name: legend[0], symbol: { fill: style.fillColor } },
            { name: legend[1], symbol: { fill: style.fillColor2 } },
          ]}
          x={340} y={300}
        />}
      </VictoryChart>
    </VictoryContainer>
  );
};

export default DoubleDataGraph;
