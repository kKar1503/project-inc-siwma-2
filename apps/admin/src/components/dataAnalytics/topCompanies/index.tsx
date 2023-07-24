import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';
import DataGraph from '@/components/graphs/dataGraph';

export interface TopCompaniesProps {
  data: Array<{ name: string, total: number }>;
}

const TopCompanies = ({ data }: TopCompaniesProps) => {
  const trimmedData = data.slice(0, 4);
  const mapData = trimmedData.map((item, index) => ({
    id: index + 1,
    value: item.total,
    label: `${item.name}\n${item.total.toString()}`,
  }));
  return (
    <ModuleBase width='85%'>
      <DataGraph data={mapData} format={trimmedData.map(() => '')}
                       style={
                         {
                           fillColor: '#d7d7d7',
                           hoverColor: '#ea3b59',
                         }
                       }>
        <Title title="Top 4 Companies with most posts" />
      </DataGraph>
    </ModuleBase>
  );
};
export default TopCompanies;
