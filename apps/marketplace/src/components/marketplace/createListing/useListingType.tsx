import React, { useState } from 'react';
import ListingTypeForm, {
  ListingTypeProps,
} from '@/components/marketplace/createListing/ListingTypeForm';

const useListingType = () => {
  const [listingType, setListingType] = useState<ListingTypeProps>('BUY');
  const [disabled, setDisabled] = useState<boolean>(false);

  const listingTypeForm = (
    <ListingTypeForm setListingType={setListingType} data={listingType} disabled={disabled} />
  );

  const listingTypeData = {
    type: listingType,
  };

  return {
    listingTypeForm,
    listingTypeData,
    setListingType,
    setDisabled,
  };
};

export default useListingType;
