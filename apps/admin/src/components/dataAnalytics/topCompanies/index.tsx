import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';
import DoubleDataGraph from '@/components/graphs/doubleDataGraph';

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
    id: Math.round((index + 1) / 2),
    value: item,
    label: item.toString(),
    isSecondary: index % 2 === 1,
  }));
  return (
    <ModuleBase>
      <Title title={`Top 4 Companies with most posts`} />
      <DoubleDataGraph data={mapData} format={format} style={
        {
          fillColor: '#d7d7d7',
          fillColor2: '#383091',
          hoverColor: '#ea3b59' ,
          hoverColor2: '#54a5f0',
        }
      } />
    </ModuleBase>
  );
};
export default TopCompanies;
