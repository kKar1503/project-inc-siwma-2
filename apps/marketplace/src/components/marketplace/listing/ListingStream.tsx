/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import ProductListingItem, { ProductListingItemProps } from './ProductListingItem';

type Props = {
  listingItemsData: Array<ProductListingItemProps>;
};
const ListingStream: React.FC<Props> = ({ listingItemsData }) => {
  const [hello, setHello] = useState('');

  return (
    <div className="slider">
      <div className="slide-track">
        { listingItemsData.map((item) => {
          return (
            <div className='slide'>
              <ProductListingItem {...item} />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ListingStream;
