import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';
import DataGraph from '@/components/graphs/dataGraph';

const format = [
  'Cat 1',
  'Cat 2',
  'Cat 3',
  'Cat 4',
  'Cat 5',
  'Cat 6',
  'Cat 7',
  'Cat 8',
];

export interface TopCategoriesProps {
  data: number[];
  type:'Buying'|'Selling';
}

const TopCategories = ({ data,type }: TopCategoriesProps) => {
  const mapData = data.map((item, index) => ({ id: index + 1, value: item, label: item.toString() }));
  return (
    <ModuleBase width='85%'>
      <DataGraph data={mapData} format={format} style={{ fillColor: '#d7d7d7', hoverColor: '#ea3b59' }}>
        <Title title={`Top 8 ${type} Categories`} />
      </DataGraph>
    </ModuleBase>
  );
};
export default TopCategories;
