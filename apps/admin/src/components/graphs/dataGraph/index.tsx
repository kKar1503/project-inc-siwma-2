import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme, VictoryTooltip } from 'victory';
import { ReactNode } from 'react';

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
  data: DataGraphElement[];
  format: Array<DataGraphFormatElement>;
  style: {
    fillColor: string;
    hoverColor: string;
  };
  children?: ReactNode;
}

const DataGraph = ({ data, format, style,children }: DataGraphProps) => {
  const tickValues = format.map((item) => item.id);
  const tickFormat = format.map((item) => item.display);
  return (
    <VictoryChart
      // adding the material theme provided with Victory
      containerComponent={<VictoryContainer />}
      theme={VictoryTheme.material}
      domainPadding={20}
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
        barRatio={0.8}
        data={data}
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
        cornerRadius={{
          top: 160 / (format.length * 2 + 1),
          bottom: 160 / (format.length * 2 + 1),
        }}
      />
    </VictoryChart>

  );
};

export default DataGraph;
