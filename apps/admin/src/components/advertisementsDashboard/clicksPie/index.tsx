import { VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';
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
      <Box style={{ position: 'relative', textAlign: 'center', width: '100%', height: '100%' }}>
        <Box style={{
          position: 'absolute',
          top: '9.8rem',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}>
          <Debug>
            <Box sx={{ fontSize: 65, fontWeight: 'bold' }}>{totalClicks}</Box>
            <Box sx={{ fontSize: 15, color: 'text.secondary' }}>Clicks</Box>
          </Debug>
        </Box>
      </Box>
      <VictoryPie
        // origin={}
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


export default Index;
