import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface DataStreamOptions {
  numberPerFetch: number;
}

const defaultOptions: DataStreamOptions = { numberPerFetch: 10 };

/**
 * DataStream is a hook that fetches paginated data one after another.
 * @warning This hook is not suitable for fetching data that you do not need at the moment. e.g. table data etc
 * @param queryKey The query key for react-query
 * @param query The query function that returns the data
 * @param callback The callback function that is called after each fetch
 * @param options The options for the data stream
 */
function DataStream<T>(
  queryKey: string,
  query: ({ lastListingId }: { lastListingId: number }) => Promise<T>,
  callback: (data: T, nextIndex: number) => boolean,
  options ?: Partial<DataStreamOptions>,
) {
  const { numberPerFetch } = { ...defaultOptions, ...options };
  const [index, setIndex] = useState<number>(0);
  const listingQuery = useQuery([queryKey, index], () => query({ lastListingId: index }), {
    enabled: index !== -1,
  });

  useEffect(() => {
    if (!listingQuery.isFetched || !listingQuery.isSuccess) return;
    const nextIndex = index + numberPerFetch;
    const stop = !callback(listingQuery.data, nextIndex);
    setIndex(stop ? -1 : nextIndex);
  }, [callback, index, listingQuery.isFetched, listingQuery.data, listingQuery.isSuccess]);

  /**
   * @returns { isComplete: boolean } A boolean that indicates whether the data stream is complete
   */
  const isComplete = index === -1;
  /**
   * @returns { refetch: () => void } Refetch all the data
   */
  const refetch = () => setIndex(0);

  return {
    isComplete,
    refetch,
  };
}


export default DataStream;
