import { VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';

export interface ActiveCategoriesProps {
  data: Array<{
    category: string;
    value: number;
  }>;
}

const ActiveCategories = ({ data }: ActiveCategoriesProps) => {
  const formattedData = data.map((item) => ({
        x: item.category,
        y: item.value,
        label: `${item.value}`,
      }),
  );
  return (
    <ModuleBase noFlex>
      <Title title="Active Categories" />
      <VictoryPie
        // origin={}
        labelComponent={<VictoryTooltip />}
        theme={VictoryTheme.material}
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


export default ActiveCategories;
