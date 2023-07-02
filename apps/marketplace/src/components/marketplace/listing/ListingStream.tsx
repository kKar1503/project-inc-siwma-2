import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import { Listing } from '@/utils/api/client/zod';
import ProductListingItem from './ProductListingItem';

type Props = {
  listingItemsData: Array<Listing> | undefined;
};

const Scroll = styled('div')({
  '@keyframes scroll': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(calc(-288px * 7 + (-48px * 7)))',
    },
  },
});

const stopScroll = (event: React.MouseEvent<HTMLInputElement>) => {
  const box: HTMLInputElement = event.currentTarget;
  box.style.animationPlayState = 'paused'
}
const continueScroll = (event: React.MouseEvent<HTMLInputElement>) => {
  const box: HTMLInputElement = event.currentTarget;
  box.style.animationPlayState = 'running'
}

const ListingStream: React.FC<Props> = ({ listingItemsData }) => (
  <Scroll sx={{ paddingTop: '2rem' }}>
    <Box sx={{ margin: 'auto', overflow: 'hidden', position: 'relative', width: 'auto' }}>
      <Box
        sx={{
          animation: 'scroll 40s linear infinite',
          display: 'flex',
          width: 'calc(288px * 14 + (48px * 14))',
        }}
        onMouseOver={stopScroll} onMouseOut={continueScroll}
      >
        {listingItemsData?.map((item) => (
          <Box sx={{ width: '288px', margin: '0 24px' }} key={item.id}>
            <ProductListingItem data={item} />
          </Box>
        ))}
      </Box>
    </Box>
  </Scroll>
);

export default ListingStream;
