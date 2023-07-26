import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';
import DataGraph from '@/components/graphs/dataGraph';

export interface TopCategoriesProps {
  data: Array<{ name: string, selling: number, buying: number, total: number }>;
  type: 'Buying' | 'Selling';
  category: string;
}

const TopGraph = ({ data, type, category }: TopCategoriesProps) => {
  const trimmedData = data.sort(
    (a, b) => type === 'Buying' ? b.buying - a.buying : b.selling - a.selling,
  ).slice(0, 8);
  const mapData = trimmedData.map((item, index) => {
    const value = type === 'Buying' ? item.buying : item.selling;
    return {
      id: index + 1,
      value,
      label: `${item.name}\n${value.toString()}`,
      isSecondary: false,
    };
  });
  return (
    <ModuleBase width='85%'>
      <DataGraph data={mapData} format={trimmedData.map(() => '')}
                 style={{ fillColor: '#d7d7d7', hoverColor: '#ea3b59' }}>
        <Title title={`Top 8 ${type} ${category}`} />
      </DataGraph>
    </ModuleBase>
  );
};
export default TopGraph;
