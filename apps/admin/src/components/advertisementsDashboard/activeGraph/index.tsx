import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';
import DataGraph from '@/components/graphs/dataGraph';

const format = [
  { id: 1, display: 'Jan' },
  { id: 2, display: 'Feb' },
  { id: 3, display: 'Mar' },
  { id: 4, display: 'Apr' },
  { id: 5, display: 'May' },
  { id: 6, display: 'Jun' },
  { id: 7, display: 'Jul' },
  { id: 8, display: 'Aug' },
  { id: 9, display: 'Sep' },
  { id: 10, display: 'Oct' },
  { id: 11, display: 'Nov' },
  { id: 12, display: 'Dec' },
];

export interface ActiveGraphProps {
  data: number[];
}

const ActiveGraph = ({ data }: ActiveGraphProps) => {
  const mapData = data.map((item, index) => ({ id: index + 1, value: item, label: item.toString() }));
  return (
    <ModuleBase>
      <DataGraph data={mapData} format={format} style={{ fillColor: '#d7d7d7', hoverColor: '#ea3b59' }}>
        <Title title='Number of active ad-spaces per month' subtitle='Year 2022' />
      </DataGraph>
    </ModuleBase>
  );
};
export default ActiveGraph;
