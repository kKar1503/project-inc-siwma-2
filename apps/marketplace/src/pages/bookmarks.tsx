import DisplayResults from '@/layouts/DisplayResults';

const title = 'Bookmarks';

const Bookmarks = ({ data }: { data: unknown[] }) => (
  <DisplayResults filter={false} data={data} title={title} />
);

export default Bookmarks;
