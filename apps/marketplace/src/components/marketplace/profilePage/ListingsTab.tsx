import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';
import { SelectComponent } from '@inc/ui';

// pass filter values to select component
const filterValues = ['All Listings', 'Buy Listings', 'Sell Listings'];
const sortValues = ['Recent', 'Price - High to Low', 'Price - Low to High'];

const ListingsTab = ({ allListings }: { allListings: ProductListingItemProps[] }) => {
  // use to filter data accordingly when called from api
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const handleFilterData = (filter: string) => {
    setFilter(filter);
  };

  const handleSortData = (sort: string) => {
    setSort(sort);
  };

  return (
    <Box>
      {/* top portion */}
      <Box sx={{ display: 'flex' }}>
        {/* search bar component goes here */}
        {/* Select Components */}
        <Box sx={{ display: 'flex', ml: 'auto' }}>
          <Box sx={({ spacing }) => ({ display: 'flex', alignItems: 'center', mr: spacing(2) })}>
            <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
              Filter:
            </Typography>
            <SelectComponent onData={handleFilterData} values={filterValues} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
              Sort By:
            </Typography>
            <SelectComponent onData={handleSortData} values={sortValues} />
          </Box>
        </Box>
      </Box>
      {/* lower portion showing marketplace cards */}
      <Box
        sx={({ spacing }) => ({
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(auto-fit, minmax(200px, 1fr))',
            xl: 'repeat(auto-fit, minmax(288px, 1fr))',
          },
          columnGap: spacing(1),
          rowGap: spacing(3),
        })}
      >
        {allListings.map(
          ({
            productId,
            img,
            profileImg,
            type,
            name,
            rating,
            price,
            negotiable,
            ownerId,
            ownerFullName,
            createdAt,
            companyName,
            isUnitPrice,
            isOwnProfile,
          }: ProductListingItemProps) => (
            <ProductListingItem
              productId={productId}
              img={img}
              profileImg={profileImg}
              type={type}
              name={name}
              rating={rating}
              price={price}
              negotiable={negotiable}
              ownerId={ownerId}
              ownerFullName={ownerFullName}
              createdAt={createdAt}
              companyName={companyName}
              isUnitPrice={isUnitPrice}
              isOwnProfile={isOwnProfile}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default ListingsTab;
