import { VictoryPie,VictoryTheme } from 'victory';

const ClicksPie = () => {
  const sampleData = [
    { id: 1, x: 'Cats', y: 35 },
    { id: 2, x: 'Dogs', y: 40 },
    { id: 3, x: 'Birds', y: 55 },
  ];
  return (
    <VictoryPie
      theme={VictoryTheme.material}
      innerRadius={() => 100}
      labels={() => ''}
      events={[{
        target: 'data',
        eventHandlers: {
          onMouseOver: () => [
            {
              target: 'data',
              mutation: ({ datum, style }) => ({
                  style: { ...style, fill: 'black' },
                  text: `${datum.x} : ${datum.y}`,
                }),
            }],
          onMouseOut: () => [
            {
              target: 'data',
              mutation: () => ({
                text:'dasdas'
              }),
            },
          ],
        },
      }]}
      data={sampleData}
    />
  );
};


export default ClicksPie;
