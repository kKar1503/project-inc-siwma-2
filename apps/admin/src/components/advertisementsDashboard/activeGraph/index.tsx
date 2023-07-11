import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import Title from '@/components/advertisementsDashboard/analyticsOverlay/title';
import DataGraph from '@/components/graphs/dataGraph';

const data = [
  { id: 1, value: 5, label: '5' },
  { id: 2, value: 1, label: '1'  },
  { id: 3, value: 2 , label: '2' },
  { id: 4, value: 4 , label: '4' },
  { id: 5, value: 4 , label: '4' },
  { id: 6, value: 2 , label: '2' },
  { id: 7, value: 4 , label: '4' },
  { id: 8, value: 2 , label: '2' },
  { id: 9, value: 3 , label: '3' },
  { id: 10, value: 4, label: '4'  },
  { id: 11, value: 0 , label: '0' },
  { id: 12, value: 0 , label: '0' },
];

const format = [
  {id:1, display: 'Jan'},
  {id:2, display: 'Feb'},
  {id:3, display: 'Mar'},
  {id:4, display: 'Apr'},
  {id:5, display: 'May'},
  {id:6, display: 'Jun'},
  {id:7, display: 'Jul'},
  {id:8, display: 'Aug'},
  {id:9, display: 'Sep'},
  {id:10, display: 'Oct'},
  {id:11, display: 'Nov'},
  {id:12, display: 'Dec'}
]
const ActiveGraph = () => (
  <ModuleBase>
    <Title title='Number of active ad-spaces per month' subtitle='Year 2022' />
    <DataGraph data={data} format={format} style={{fillColor:'#d7d7d7' ,hoverColor:'#ea3b59' }}/>
  </ModuleBase>
  );

export default ActiveGraph;
