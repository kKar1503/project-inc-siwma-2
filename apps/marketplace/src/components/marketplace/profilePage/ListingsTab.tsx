import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import { SelectComponent, useResponsiveness, SearchBar } from '@inc/ui';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { Listing } from '@/utils/api/client/zod';

// pass filter values to select component
const filterValues = ['All Listings', 'Buy Listings', 'Sell Listings'];
const sortValues = ['Recent', 'Price - High to Low', 'Price - Low to High'];

export type ListingsTabProps = {
  allListings: Listing[] | null | undefined;
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
      marginBottom: spacing(2),
      flexDirection: isSm ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: isSm ? 'center' : 'space-between',
      width: isSm ? 'auto' : '100%',
    }),
    [isSm]
  );

  return (
    <Box>
      {/* top portion */}
        <Box sx={{ display: 'flex', justifyContent: isSm ? 'center' : 'flex-start' }}>
          {/* Select Components */}
          <Box sx={styleFilter}>
            <SearchBar />
            <Box sx={({ spacing }) => ({ display: 'flex', alignItems: 'center', mr: spacing(1), mt: isSm ? spacing(1) : spacing(0) })}>
              <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
                Filter:
              </Typography>
              <SelectComponent onData={filterListings} values={filterValues} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
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
