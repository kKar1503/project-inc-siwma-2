import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TopGraph from 'src/components/dataAnalytics/topGraph';
import TopCompanies from '@/components/dataAnalytics/topCompanies';
import TopCompaniesBuySell from '@/components/dataAnalytics/topCompaniesBuySell';
import PieChart from 'src/components/dataAnalytics/pieChart';
import LineGraph from '@/components/dataAnalytics/lineGraph';
import { useQueries, UseQueryResult } from 'react-query';
import fetchCategories from '@/services/categories/fetchCategories';
import { CategoryResponseBody } from '@/utils/api/client/zod';
import { useMemo, useState } from 'react';
import fetchListings from '@/services/listings/fetchListings';
import DataStream from '@/hooks/DataStream';
import fetchProducts from '@/services/products/fetchProducts';
import CircularProgress from '@mui/material/CircularProgress';

const categoryMap = (query: UseQueryResult<CategoryResponseBody[]>): Record<string, {
  name: string,
  active: boolean
}> => {
  const record: Record<string, { name: string, active: boolean }> = {};
  if (!query.isSuccess) return record;
  query.data.forEach(({ id, name, active }) => {
    record[id] = { name, active };
  });
  return record;
};

const mapTopCompanies = (listingCompanyBin: Map<string, { buying: number, selling: number }>) => {
  const topCompanies: Array<{ name: string, buying: number, selling: number, total: number }> = [];
  listingCompanyBin.forEach(({ buying, selling }, name) => {
    topCompanies.push({ name, buying, selling, total: buying + selling });
  });
  topCompanies.sort((a, b) => b.total - a.total);
  return topCompanies;
};

const mapTopProducts = (listingProductsBin: Map<string, {
  buying: number,
  selling: number
}>, productToCategoryAndName: Map<string, {
  name: string,
  categoryId: string
}>) => {
  const topProducts: Array<{ name: string, categoryId?: string, buying: number, selling: number, total: number }> = [];
  listingProductsBin.forEach(({ buying, selling }, id) => {
    const { name = 'loading...', categoryId } = productToCategoryAndName.get(id) || {};
    topProducts.push({ name, categoryId, buying, selling, total: buying + selling });
  });
  return topProducts;
};

const mapTopCategories = (topProducts: Array<{
  name: string,
  categoryId?: string,
  buying: number,
  selling: number,
  total: number
}>, categoryNames: Record<string, { name: string, active: boolean }>) => {
  const topCategories: Array<{ name: string, buying: number, selling: number, total: number, active: boolean }> = [];
  const categoryBin = new Map<string, { buying: number, selling: number }>();
  topProducts.forEach(({ categoryId, buying, selling }) => {
    if (!categoryId) return;
    const { buying: buyingTotal, selling: sellingTotal } = categoryBin.get(categoryId) || { buying: 0, selling: 0 };
    categoryBin.set(categoryId, { buying: buyingTotal + buying, selling: sellingTotal + selling });
  });
  categoryBin.forEach(({ buying, selling }, categoryId) => {
    const { name, active } = categoryNames[categoryId];
    topCategories.push({ name, buying, selling, total: buying + selling, active });
  });
  return topCategories;
};


const Analytics = () => {
  // Use States
  const [listingCompanyBin, setListingCompanyBin] = useState<Map<string, {
    buying: number,
    selling: number
  }>>(new Map());
  const [listingProductsBin, setListingProductsBin] = useState<Map<string, {
    buying: number,
    selling: number,
  }>>(new Map());
  const [listingMonthsBin, setListingMonthsBin] = useState<Array<{
    buying: number,
    selling: number,
    // eslint-disable-next-line prefer-spread
  }>>(Array.apply(null, Array(12)).map(() => ({ buying: 0, selling: 0 })));
  const [productToCategoryAndName, setProductToCategoryAndName] = useState<Map<string, {
    name: string,
    categoryId: string
  }>>(new Map());

  // Queries
  const [categoriesQuery] = useQueries([
    { queryKey: 'categories', queryFn: () => fetchCategories() },
  ]);

  const listingQuery = DataStream('listings', fetchListings, (data, nextIndex) => {
    // cache states in local variables
    const listingCompanyBinLocal = listingCompanyBin;
    const listingProductsBinLocal = listingProductsBin;
    const listingMonthsBinLocal = listingMonthsBin;
    data.listings.forEach(listing => {
      // company stuff
      {
        const { company } = listing.owner;
        const buySell = listingCompanyBinLocal.get(company.name) || { buying: 0, selling: 0 };
        if (listing.type === 'BUY') {
          buySell.buying++;
        }
        if (listing.type === 'SELL') {
          buySell.selling++;
        }
        listingCompanyBinLocal.set(company.name, buySell);
      }
      // product stuff
      {
        const { productId, createdAt } = listing;
        const buySellProducts = listingProductsBinLocal.get(productId) || { buying: 0, selling: 0 };
        const month = new Date(createdAt).getMonth();
        const buySellMonth = listingMonthsBinLocal[month];
        if (listing.type === 'BUY') {
          buySellProducts.buying++;
          buySellMonth.buying++;
        }
        if (listing.type === 'SELL') {
          buySellProducts.selling++;
          buySellMonth.selling++;
        }
        listingProductsBinLocal.set(productId, buySellProducts);
        listingMonthsBinLocal[month] = buySellMonth;
      }
    });
    // set all changes in one go
    setListingCompanyBin(listingCompanyBinLocal);
    setListingProductsBin(listingProductsBinLocal);
    setListingMonthsBin(listingMonthsBinLocal);
    return nextIndex < data.totalCount;
  });

  const productsQuery = DataStream('products', fetchProducts, (data, nextIndex) => {
    const productToCategoryAndNameLocal = productToCategoryAndName;
    data.listingItems.forEach(({ id, categoryId, name }) => {
      productToCategoryAndNameLocal.set(id, { categoryId, name });
    });
    setProductToCategoryAndName(productToCategoryAndNameLocal);
    return nextIndex < data.totalCount;
  });


  // useMemo (dependencies aren't exactly right, but it's intentional as the default suggested dependencies don't update - since no change in reference)
  const categoryNames = useMemo(() => categoryMap(categoriesQuery), [categoriesQuery, categoriesQuery.isSuccess]);

  const topCompanies = useMemo(() => mapTopCompanies(listingCompanyBin), [listingCompanyBin, listingCompanyBin.size]);

  const topProducts = useMemo(() => mapTopProducts(listingProductsBin, productToCategoryAndName), [listingProductsBin, listingProductsBin.size, productToCategoryAndName, productToCategoryAndName.size]);

  const topCategories = useMemo(() => mapTopCategories(topProducts, categoryNames), [topProducts, topProducts.length, categoryNames]);

  // Check on query states to see if we're done loading, if not, show loading indicator (using custom one instead of Spinner)
  const companyFinishedLoading = listingQuery.isComplete;
  const settlementFinishedLoading = listingQuery.isComplete && productsQuery.isComplete && categoriesQuery.isFetched;

  return (
    <Box style={{
      marginTop: '1rem',
      marginRight: '1rem',
      marginLeft: '1rem',
    }}>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <h1>
            Company &nbsp;
            {companyFinishedLoading || <CircularProgress size={30} />}
          </h1>
        </Grid>

        <Grid container item xs={6} md={4}>
          <TopCompanies data={topCompanies} />
        </Grid>
        <Grid container item xs={6} md={4}>
          <TopCompaniesBuySell data={topCompanies} />
        </Grid>
        <Grid container item xs={6} md={4}>
          <LineGraph data={listingMonthsBin} />
        </Grid>

        <Grid container item xs={12}>
          <h1>
            Settlement &nbsp;
            {settlementFinishedLoading || <CircularProgress size={30} />}
          </h1>
        </Grid>

        <Grid container item xs={6} md={4}>
          <TopGraph data={topCategories} type='Selling' category='Categories' />
        </Grid>
        <Grid container item xs={6} md={4}>
          <TopGraph data={topCategories} type='Buying' category='Categories' />
        </Grid>
        <Grid container item xs={6} md={4}>
          <PieChart data={topCategories.filter(c => c.active)} title='Active Categories' />
        </Grid>

        <Grid container item xs={6} md={4}>
          <TopGraph data={topProducts} type='Selling' category='Products' />
        </Grid>
        <Grid container item xs={6} md={4}>
          <TopGraph data={topProducts} type='Buying' category='Products' />
        </Grid>
        <Grid container item xs={6} md={4}>
          <PieChart data={topProducts} title='Active Products' />
        </Grid>

      </Grid>
    </Box>
  );
};


export default Analytics;
