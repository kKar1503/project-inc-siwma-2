import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductListingItem from '@/components/marketplace/listing/ProductListingItem';
import { SelectComponent, useResponsiveness, SearchBar } from '@inc/ui';
import { useTheme } from '@mui/material/styles';
import { Listing } from '@/utils/api/client/zod';

// pass filter values to select component
const filterValues = ['All Listings', 'Buy Listings', 'Sell Listings'];
const filterValuesCn = ['全部商品', '商品（购买）', '商品（出售）'];
const filterEndpointValues = ['all', 'BUY', 'SELL'];
const sortValues = ['Recent', 'Price - High to Low', 'Price - Low to High'];
const sortValuesCn = ['近期', '价格（从高到低）', '价格（从低到高）'];
const sortEndpointValues = ['recent_newest', 'price_desc', 'price_asc'];

export type ListingsTabProps = {
  allListings: Listing[] | null | undefined;
  handleSearch: (query: string) => void;
  filterListings: (newData: (typeof filterValues)[number]) => void;
  sortByListings: (newData: (typeof sortValues)[number]) => void;
  setDel: React.Dispatch<React.SetStateAction<string>>;
};

const ListingsTab = ({
  allListings,
  handleSearch,
  filterListings,
  sortByListings,
  setDel,
}: ListingsTabProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing } = useTheme();

  const { i18n, t } = useTranslation();

  const tFilterValues = i18n.language === 'en' ? filterValues : filterValuesCn;
  const tsortValues = i18n.language === 'en' ? sortValues : sortValuesCn;

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
          <Box sx={{ width: '250px' }}>
            <SearchBar onChange={handleSearch} />
          </Box>
          <Box
            sx={({ spacing }) => ({
              display: 'flex',
              alignItems: 'center',
              mr: spacing(1),
              mt: isSm ? spacing(1) : spacing(0),
            })}
          >
            <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
              {t('Filter')}:
            </Typography>
            <SelectComponent
              onData={filterListings}
              displayValues={tFilterValues}
              values={filterEndpointValues}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
              {t('Sort By')}:
            </Typography>
            <SelectComponent
              onData={sortByListings}
              displayValues={tsortValues}
              values={sortEndpointValues}
            />
          </Box>
        </Box>
      </Box>
      {/* lower portion showing marketplace cards */}

      <Box sx={stylesListing}>
        {allListings?.map((listing) => (
          <ProductListingItem data={listing} key={listing.id} setDel={setDel} />
        ))}
      </Box>
    </Box>
  );
};

export default ListingsTab;
