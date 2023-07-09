import { VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';

const ClicksPie = () => {
  const sampleData = [
    { id: 1, x: 'Cats', y: 35, label: '35' },
    { id: 2, x: 'Dogs', y: 40, label: '40' },
    { id: 3, x: 'Birds', y: 55, label: '55' },
  ];
  return (
    <ModuleBase>
      <VictoryPie
        labelComponent={<VictoryTooltip />}
        theme={VictoryTheme.material}
        innerRadius={() => 100}
        events={[{
          target: 'data',
          eventHandlers: {
            onMouseOver: () => [
              {
                target: 'labels',
                mutation: () => ({ active: true }),
              },
            ],
            onMouseOut: () => [
              {
                target: 'labels',
                mutation: () => ({ active: false }),
              },
            ],
          },
        }]}
        data={sampleData}
      />
    </ModuleBase>
  );
};


export default ClicksPie;
