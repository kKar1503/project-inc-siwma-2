import { VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';

export interface ClicksPieProps {
  data: Array<{
    company: string;
    clicks: number;
  }>;
}

const ClicksPie = ({ data }: ClicksPieProps) => {
  const formattedData = data.map((item) => ({
    x: item.company,
    y: item.clicks,
    label: `${item.company}\n${item.clicks}`,
  }));
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
        data={formattedData}
      />
    </ModuleBase>
  );
};


export default ClicksPie;
