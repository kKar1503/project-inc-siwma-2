import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';
import { SelectComponent } from '@inc/ui';

// pass filter values to select component
const filterValues = ['All Listings', 'Buy Listings', 'Sell Listings'];
const sortValues = ['Recent', 'Price - High to Low', 'Price - Low to High'];

export type ListingsTabProps = {
  allListings: ProductListingItemProps[];
  filterListings: (newData: (typeof filterValues)[number]) => void;
  sortByListings: (newData: (typeof sortValues)[number]) => void;
};

const ListingsTab = ({ allListings, filterListings, sortByListings }: ListingsTabProps) => (
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
          <SelectComponent onData={filterListings} values={filterValues} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
            Sort By:
          </Typography>
          <SelectComponent onData={sortByListings} values={sortValues} />
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
      {allListings.map((listing) => (
        <ProductListingItem data={listing} />
      ))}
    </Box>
  </Box>
);

export default ListingsTab;
