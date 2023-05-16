import Box from '@mui/material/Box';
import { InfiniteScroll } from '@inc/ui';
import { useState } from 'react';

interface IListing {
  id: number;
  name: string;
  price: number;
  user: string;
}

const InfiniteScrollingPage = () => {
  const [listings, setListings] = useState<IListing[]>([
    { id: 1, name: 'test', price: 1, user: 'test' },
  ]);

  return (
    <InfiniteScroll
      sx='border: "red"'
      onLoadMore={() => {
        setListings((prev) => [
          ...prev,
          { id: prev.length + 1, name: 'test', price: 1, user: 'test' },
        ]);
      }}
      loading={false}
      reachedMaxItems={false}
    >
      {listings.map((listing) => (
        <Box key={listing.id}>{listing.id} {listing.name}</Box>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollingPage;
