import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';
import DataGraph from '@/components/graphs/dataGraph';

const format = [
  { id: 1, display: 'Company 1' },
  { id: 2, display: 'Company 2' },
  { id: 3, display: 'Company 3' },
  { id: 4, display: 'Company 4' },
];

export interface TopCompaniesProps {
  data: number[];
}

const TopCompanies = ({ data }: TopCompaniesProps) => {
  const mapData = data.map((item, index) => ({
    id: index + 1,
    value: item,
    label: item.toString(),
  }));
  return (
    <ModuleBase width='85%'>
      <DataGraph data={mapData} format={format}
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
