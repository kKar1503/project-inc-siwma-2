/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { MeiliSearch } from 'meilisearch';
import universities from '../../world_universities_and_domains.json';

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILI_URL!,
  process.env.NEXT_PUBLIC_MEILI_MASTER_KEY
);

const getServerSideProps = async () => {
  const client = new MeiliSearch({
    host: process.env.MEILI_URL as string,
    apiKey: process.env.MEILI_MASTER_KEY as string,
  });

  const newUniversities = universities.map((university, index) => ({
    ...university,
    id: index + 1,
  }));

  if (!(await client.getIndex('universities'))) {
    await client.index('universities').addDocuments(newUniversities);
  }

  console.log(await client.getTasks());

  return {
    props: {},
  };
};

const Hit = ({ hit }: any) => <Highlight attribute="name" hit={hit} />;

const TestMSearch = () => (
  <InstantSearch indexName="listings" searchClient={searchClient}>
    <SearchBox />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);

export { getServerSideProps };
export default TestMSearch;
