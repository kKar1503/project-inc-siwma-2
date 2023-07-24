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


const mapData = (categories: UseQueryResult<CategoryResponseBody[]>) => {
  const activeCategories = categories.data?.filter(i => i.active).map((item) => ({
    category: item.name,
    value: item.id,
  })) || [];
  const buyingSellingData = [
    { month: 1, value: 1, isBuying: true }, { month: 1, value: 2, isBuying: false },
    { month: 2, value: 3, isBuying: true }, { month: 2, value: 1, isBuying: false },
    { month: 3, value: 5, isBuying: true }, { month: 3, value: 4, isBuying: false },
    { month: 4, value: 4, isBuying: true }, { month: 4, value: 1, isBuying: false },
    { month: 5, value: 6, isBuying: true }, { month: 5, value: 13, isBuying: false },
    { month: 6, value: 2, isBuying: true }, { month: 6, value: 19, isBuying: false },
    { month: 7, value: 0, isBuying: true }, { month: 7, value: 21, isBuying: false },
    { month: 8, value: 11, isBuying: true }, { month: 8, value: 21, isBuying: false },
    { month: 9, value: 10, isBuying: true }, { month: 9, value: 14, isBuying: false },
    { month: 10, value: 10, isBuying: true }, { month: 10, value: 11, isBuying: false },
    { month: 11, value: 20, isBuying: true }, { month: 11, value: 12, isBuying: false },
    { month: 12, value: 30, isBuying: true }, { month: 12, value: 14, isBuying: false },
  ];
  return { activeCategories, buyingSellingData };
};

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
  const [listingCompanyBin, setListingCompanyBin] = useState<Map<string, {
    buying: number,
    selling: number
  }>>(new Map());
  const [listingProductsBin, setListingProductsBin] = useState<Map<string, {
    buying: number,
    selling: number
  }>>(new Map());
  const [productToCategoryAndName, setProductToCategoryAndName] = useState<Map<string, {
    name: string,
    categoryId: string
  }>>(new Map());

  const [categoriesQuery] = useQueries([
    { queryKey: 'categories', queryFn: () => fetchCategories() },
  ]);

  const categoryNames = useMemo(() => categoryMap(categoriesQuery), [categoriesQuery.isSuccess]);

  const listingQuery = DataStream('listings', fetchListings, (data, nextIndex) => {
    console.log(data);
    const listingCompanyBinLocal = listingCompanyBin;
    const listingProductsBinLocal = listingProductsBin;
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
        const { productId } = listing;
        const buySell = listingProductsBinLocal.get(productId) || { buying: 0, selling: 0 };
        if (listing.type === 'BUY') {
          buySell.buying++;
        }
        if (listing.type === 'SELL') {
          buySell.selling++;
        }
        listingProductsBinLocal.set(productId, buySell);
      }
    });
    setListingCompanyBin(listingCompanyBinLocal);
    setListingProductsBin(listingProductsBinLocal);

    return nextIndex < data.totalCount;
  });

  const productsQuery = DataStream('products', fetchProducts, (data, nextIndex) => {
    console.log(data);

    const productToCategoryAndNameLocal = productToCategoryAndName;
    data.listingItems.forEach(item => {
      const { id, categoryId, name } = item;
      productToCategoryAndNameLocal.set(id, { categoryId, name });
    });

    setProductToCategoryAndName(productToCategoryAndNameLocal);

    return nextIndex < data.totalCount;
  });

  const {
    activeCategories,
    buyingSellingData,
  } = useMemo(() => mapData(categoriesQuery), [categoriesQuery]);

  const topCompanies = useMemo(() => mapTopCompanies(listingCompanyBin), [listingProductsBin.size]);

  const topProducts = useMemo(() => mapTopProducts(listingProductsBin, productToCategoryAndName), [listingProductsBin.size, productToCategoryAndName.size]);

  const topCategories = useMemo(() => mapTopCategories(topProducts, categoryNames), [topProducts.length, categoryNames]);
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
          <LineGraph data={buyingSellingData} />
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
