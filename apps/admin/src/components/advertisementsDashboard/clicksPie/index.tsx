import { VictoryContainer, VictoryLabel, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';

export interface ClicksPieProps {
  data: Array<{
    company: string;
    clicks: number;
  }>;
  totalClicks: number;
}

const maxDisplayLength = 15;

const Index = ({ data, totalClicks }: ClicksPieProps) => {
  const formattedData = data.map((item) => {
      const displayName = item.company.length > maxDisplayLength ? `${item.company.slice(0, maxDisplayLength - 3)}...` : item.company;
      return ({
        x: item.company,
        y: item.clicks,
        label: `${displayName}\n${item.clicks}`,
      });
    },
  );
  return (
    <ModuleBase noFlex height='95%' width='100%'>
      <VictoryContainer>
        <svg viewBox='60 0 300 300'>
          <Title title='Total click distribution' subtitle='Number of clicks per ad-space' />
          <VictoryPie
            // origin={}
            standalone={false}
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
          <VictoryLabel
            textAnchor='middle'
            style={{ fontSize: 65, fontWeight: 'bold' }}
            x={170} y={165}
            text={totalClicks}
          />
          <VictoryLabel
            textAnchor='middle'
            style={{ fontSize: 15, color: 'text.secondary' }}
            x={170} y={205}
            text='Clicks'
          />
        </svg>
      </VictoryContainer>
    </ModuleBase>
  );
};


export default Index;
