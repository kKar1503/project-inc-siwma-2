import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILI_URL as string,
  process.env.NEXT_PUBLIC_MEILI_MASTER_KEY as string
);

const Hit = ({ hit }: any) => <Highlight attribute="name" hit={hit} />;

const TestMSearch = () => (
  <InstantSearch indexName="listings" searchClient={searchClient}>
    <SearchBox />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);

export default TestMSearch;
