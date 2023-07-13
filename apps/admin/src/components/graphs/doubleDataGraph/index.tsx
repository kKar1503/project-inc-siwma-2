import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';

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
}

const DoubleDataGraph = ({ data, format, style }: DataGraphProps) => {
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
    <VictoryChart
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={20}
    >
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
    </VictoryChart>
  );
};

export default DoubleDataGraph;
