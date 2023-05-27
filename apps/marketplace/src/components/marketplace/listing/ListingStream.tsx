import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import ProductListingItem, { ProductListingItemProps } from './ProductListingItem';

type Props = {
  listingItemsData: Array<ProductListingItemProps> | undefined;
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

const ListingStream: React.FC<Props> = ({ listingItemsData }) => (
  <Scroll sx={{ paddingTop: '2rem' }}>
    <Box sx={{ margin: 'auto', overflow: 'hidden', position: 'relative', width: 'auto' }}>
      <Box
        sx={{
          animation: 'scroll 32s linear infinite',
          display: 'flex',
          width: 'calc(288px * 14 + (48px * 14))',
        }}
      >
        {listingItemsData?.map((item) => (
          <Box sx={{ width: '288px', margin: '0 24px' }} key={item.productId}>
            <ProductListingItem data={item} />
          </Box>
        ))}
      </Box>
    </Box>
  </Scroll>
);

export default ListingStream;
