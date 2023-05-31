import React, { useState } from 'react';
import ListingTypeForm, { ListingTypeProps } from '@/components/marketplace/createListing/ListingTypeForm';



const useListingType = () => {
  const [listingType, setListingType] = useState<ListingTypeProps>('BUY');

  const listingTypeForm = <ListingTypeForm setListingType={setListingType} />;

  const listingTypeData = {
    type: listingType,
  }

  return {
    listingTypeForm,
    listingTypeData,
  };

};

export default useListingType;
