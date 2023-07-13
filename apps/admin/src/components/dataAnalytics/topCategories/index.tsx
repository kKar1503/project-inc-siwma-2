import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';
import DataGraph from '@/components/graphs/dataGraph';

const format = [
  { id: 1, display: 'Cat 1' },
  { id: 2, display: 'Cat 2' },
  { id: 3, display: 'Cat 3' },
  { id: 4, display: 'Cat 4' },
  { id: 5, display: 'Cat 5' },
  { id: 6, display: 'Cat 6' },
  { id: 7, display: 'Cat 7' },
  { id: 8, display: 'Cat 8' },
];

export interface TopCategoriesProps {
  data: number[];
  type:'Buying'|'Selling';
  year: number;
}

const TopCategories = ({ data,type,year }: TopCategoriesProps) => {
  const mapData = data.map((item, index) => ({ id: index + 1, value: item, label: item.toString() }));
  return (
    <ModuleBase width='85%'>
      <DataGraph data={mapData} format={format} style={{ fillColor: '#d7d7d7', hoverColor: '#ea3b59' }}>
        <Title title={`Top 8 ${type} Categories in ${year}`} />
      </DataGraph>
    </ModuleBase>
  );
};
export default TopCategories;
