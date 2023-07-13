import { VictoryLabel, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';
import Box from '@mui/material/Box';
import Debug from '@/components/Debug';

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
    <ModuleBase noFlex>
      <Title title='Total click distribution' subtitle='Number of clicks per ad-space' />
      <svg viewBox='0 0 400 400'>
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
          x={180} y={165}
          text={totalClicks}
        />
        <VictoryLabel
          textAnchor='middle'
          style={{ fontSize: 15, color: 'text.secondary' }}
          x={180} y={205}
          text='Clicks'
        />
      </svg>
    </ModuleBase>
  );
};


export default Index;
