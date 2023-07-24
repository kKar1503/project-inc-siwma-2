import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TopCategories from '@/components/dataAnalytics/topCategories';
import TopCompanies from '@/components/dataAnalytics/topCompanies';
import TopCompaniesBuySell from '@/components/dataAnalytics/topCompaniesBuySell';
import ActiveCategories from '@/components/dataAnalytics/activeCategories';
import LineGraph from '@/components/dataAnalytics/lineGraph';
import { useQueries, useQuery, UseQueryResult } from 'react-query';
import fetchCategories from '@/services/categories/fetchCategories';
import { CategoryResponseBody, CompanyResponseBody, Listing } from '@/utils/api/client/zod';
import { useEffect, useMemo, useState } from 'react';
import fetchCompanies from '@/services/companies/fetchCompanies';
import fetchListings from '@/services/listings/fetchListings';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';

const numberPerFetch = 10;
const ListingStream = (callback: (listings: Listing[]) => void) => {
  const [index, setIndex] = useState<number>(0);
  const listingQuery = useQuery(['listing', index], () => fetchListings({ lastListingId: index }), {
    enabled: index !== -1,
  });

  useEffect(() => {
    if (!listingQuery.isFetched || !listingQuery.isSuccess) return;
    callback(listingQuery.data.listings);
    const nextIndex = index + numberPerFetch;
    setIndex((nextIndex >= listingQuery.data.totalCount) ? -1 : nextIndex);
  }, [callback, index, listingQuery.isFetched, listingQuery.data, listingQuery.isSuccess]);

  return {
    isComplete: index === -1,
  };
};
const mapData = (categories: UseQueryResult<CategoryResponseBody[]>, companies: UseQueryResult<CompanyResponseBody[]>) => {
  const activeCategories = categories.data?.filter(i => i.active).map((item) => ({
    category: item.name,
    value: item.id,
  })) || [];
  const topBuyingCategories = [18, 33, 12, 12, 25, 14, 12, 33];
  const topSellingCategories = [18, 33, 12, 12, 25, 14, 12, 33];
  const topCompanies = [18 + 33, 12 + 12, 25 + 14, 12 + 33];
  const topCompaniesBuySell = [18, 33, 12, 12, 25, 14, 12, 33];
  const buyingSellingData = [
    { month: 1, value: 1, isBuying: true },
    { month: 1, value: 2, isBuying: false },
    { month: 2, value: 3, isBuying: true },
    { month: 2, value: 1, isBuying: false },
    { month: 3, value: 5, isBuying: true },
    { month: 3, value: 4, isBuying: false },
    { month: 4, value: 4, isBuying: true },
    { month: 4, value: 1, isBuying: false },
    { month: 5, value: 6, isBuying: true },
    { month: 5, value: 13, isBuying: false },
    { month: 6, value: 2, isBuying: true },
    { month: 6, value: 19, isBuying: false },
    { month: 7, value: 0, isBuying: true },
    { month: 7, value: 21, isBuying: false },
    { month: 8, value: 11, isBuying: true },
    { month: 8, value: 21, isBuying: false },
    { month: 9, value: 10, isBuying: true },
    { month: 9, value: 14, isBuying: false },
    { month: 10, value: 10, isBuying: true },
    { month: 10, value: 11, isBuying: false },
    { month: 11, value: 20, isBuying: true },
    { month: 11, value: 12, isBuying: false },
    { month: 12, value: 30, isBuying: true },
    { month: 12, value: 14, isBuying: false },
  ];
  return { activeCategories, topBuyingCategories, topSellingCategories,buyingSellingData,topCompaniesBuySell, topCompanies };
};

const Analytics = () => {
  const [listingCompanyBin, setListingCompanyBin] = useState<Map<string, {
    buying: number,
    selling: number
  }>>(new Map());
  const [listingCategoryBin, setListingCategoryBin] = useState<Record<string, number>>({});

  const [categories, companies] = useQueries([
    { queryKey: 'categories', queryFn: () => fetchCategories() },
    { queryKey: 'companies', queryFn: () => fetchCompanies() },
  ]);


  const listingQuery = ListingStream((listings) => {
    console.log(listings);
    const listingCompanyBinLocal = listingCompanyBin;
    const listingCategoryBinLocal = listingCategoryBin;
    listings.forEach(listing => {
      // company stuff
      const { company } = listing.owner;
      const buySell = listingCompanyBinLocal.get(company.id) || { buying: 0, selling: 0 };
      if (listing.type === 'BUY') {
        buySell.buying++;
      }
      if (listing.type === 'SELL') {
        buySell.selling++;
      }
      listingCompanyBinLocal.set(company.id, buySell);
      // category stuff
      // const { company } = listing.owner;
      // const buySell = listingCompanyBinLocal.get(company.id) || { buying: 0, selling: 0 };
      // if (listing.type === 'BUY') {
      //   buySell.buying++;
      // }
      // if (listing.type === 'SELL') {
      //   buySell.selling++;
      // }
      // listingCompanyBinLocal.set(company.id, buySell);
    });
    setListingCompanyBin(listingCompanyBinLocal);
    setListingCategoryBin(listingCategoryBinLocal);
  });


  const {
    activeCategories,
    topBuyingCategories,
    topSellingCategories,
    topCompaniesBuySell,
    buyingSellingData,
  } = useMemo(() => mapData(categories, companies), [categories, companies]);

  if (!listingQuery.isComplete) {
    return <SpinnerPage />;
  }

  let topCompanies: Array<{ name: string, buying: number, selling: number, total: number }> = [];
  listingCompanyBin.forEach(({ buying, selling }, companyId) => {
    topCompanies.push({ name: companyId, buying, selling, total: buying + selling });
  });
  topCompanies.sort((a,b) => b.total - a.total);

  return (
    <Box style={{
      marginTop: '1rem',
      marginRight: '1rem',
      marginLeft: '1rem',
    }}>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <h1>Company</h1>
        </Grid>

        <Grid container item xs={6} md={4}>
          <TopCompanies data={topCompanies} />
        </Grid>
        <Grid container item xs={6} md={4}>
          <TopCompaniesBuySell data={topCompanies} />
        </Grid>
        <Grid container item xs={6} md={4}>
          <LineGraph data={buyingSellingData} />
        </Grid>

          <Grid container item xs={12}>
            <h1>Settlement</h1>
          </Grid>

          <Grid container item xs={6} md={4}>
              <TopCategories data={topSellingCategories} type='Selling' />
          </Grid>
          <Grid container item xs={6} md={4}>
            <TopCategories data={topBuyingCategories} type='Buying' />
          </Grid>
          <Grid container item xs={6} md={4}>
            <ActiveCategories data={activeCategories} />
          </Grid>
        </Grid>
    </Box>
  );
};


export default Analytics;
