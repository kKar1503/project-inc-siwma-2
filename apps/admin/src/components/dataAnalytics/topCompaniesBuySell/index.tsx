import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/graphs/overlay/title';
import DoubleDataGraph from '@/components/graphs/doubleDataGraph';

export interface TopCompaniesProps {
  data: Array<{ name: string, buying: number, selling: number }>;
}

const TopCompanies = ({ data }: TopCompaniesProps) => {
  const trimmedData = data.slice(0, 4);
  console.log(trimmedData)
  const buyData = trimmedData.map((item, index) => ({
    id: index + 1,
    value: item.buying,
    label: `${item.name}\n${item.buying.toString()}`,
    isSecondary: false,
  }));
  const sellData = trimmedData.map((item, index) => ({
    id: index + 1,
    value: item.selling,
    label: `${item.name}\n${item.selling.toString()}`,
    isSecondary: true,
  }));
  return (
    <ModuleBase width='85%'>
      <DoubleDataGraph data1={buyData} data2={sellData} format={trimmedData.map(() => '')}
                       legend={['Buying', 'Selling']}
                       style={
                         {
                           fillColor: '#d7d7d7',
                           fillColor2: '#383091',
                           hoverColor: '#ea3b59',
                           hoverColor2: '#54a5f0',
                         }
                       }>
        <Title title={`Top 4 Companies with most posts`} />
      </DoubleDataGraph>
    </ModuleBase>
  );
};
export default TopCompanies;
