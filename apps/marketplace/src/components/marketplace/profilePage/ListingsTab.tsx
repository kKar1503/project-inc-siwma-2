import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductListingItem, {
  ProductListingItemProps,
} from '@/components/marketplace/listing/ProductListingItem';
import { SelectComponent } from '@inc/ui';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';

// pass filter values to select component
const filterValues = ['All Listings', 'Buy Listings', 'Sell Listings'];
const sortValues = ['Recent', 'Price - High to Low', 'Price - Low to High'];

export type ListingsTabProps = {
  allListings: ProductListingItemProps[];
  filterListings: (newData: (typeof filterValues)[number]) => void;
  sortByListings: (newData: (typeof sortValues)[number]) => void;
};

const ListingsTab = ({ allListings, filterListings, sortByListings }: ListingsTabProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing } = useTheme();

  const stylesListing = useMemo(() => {
    if (isSm) {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        columnGap: spacing(1),
        rowGap: spacing(3),
      };
    }
    if (isMd) {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: spacing(1),
        rowGap: spacing(3),
      };
    }
    if (isLg) {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        columnGap: spacing(1),
        rowGap: spacing(3),
      };
    }
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      columnGap: spacing(1),
      rowGap: spacing(3),
    };
  }, [isSm, isMd, isLg]);

  const styleFilter = useMemo(
    () => ({
      display: 'flex',
      margin: 'auto',
      marginBottom: spacing(2),
      flexDirection: isSm ? 'column' : 'row',
      alignItems: isSm ? 'flex-start' : 'center',
    }),
    [isSm]
  );

  return (
    <Box>
      {/* top portion */}
      <Box sx={{ display: 'flex' }}>
        {/* search bar component goes here */}
        {/* Select Components */}
        <Box sx={styleFilter}>
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
      <Box sx={stylesListing}>
        {allListings?.map((listing) => (
          <ProductListingItem data={listing} />
        ))}
      </Box>
    </Box>
  );
};

export default ListingsTab;
