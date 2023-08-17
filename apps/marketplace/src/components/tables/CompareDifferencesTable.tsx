import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import fetchListing from '@/services/fetchListing';
import fetchCatById from '@/services/fetchCatById';
import fetchProduct from '@/services/fetchProduct';
import useParameters from '@/services/listings/useParameters';
import { Listing } from '@/utils/api/client/zod/listings';
import { Category } from '@/utils/api/client/zod/categories';
import { Product } from '@/utils/api/client/zod/products';
import useParamStore from '@/stores/parameters';
import S3BoxImage from '@/components/S3BoxImage';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

interface TableRowData {
  id: string;
  data: (string | JSX.Element)[];
}

interface TableData {
  sideHeaders: string[];
  rows: TableRowData[];
}

interface CompareDifferencesProps {
  listingIds: string[];
}

const S3BoxImageCell = ({ image }: { image: string }) => (
  <TableCell>
    <S3BoxImage
      sx={{
        height: { xs: 50, sm: 75, md: 100, lg: 125 },
        display: 'block',
        width: { xs: 0, sm: 150, md: 200, lg: 250 },
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      src={image}
    />
  </TableCell>
);

const CompareDifferences = ({ listingIds }: CompareDifferencesProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [parameters, addParams] = useParamStore((state) => [state.params, state.addParams]);
  const [paramIdsToFetch, setParamIdsToFetch] = useState<string[]>([]);
  const { data: params } = useParameters(paramIdsToFetch);

  const router = useRouter();

  const selectedListing = useQuery(
    'getCompareListing',
    async () => Promise.all(listingIds.map((id) => fetchListing(id))),
    {
      enabled: listingIds !== undefined,
      retry: false,
    }
  );

  const selectedProduct = useQuery(
    'getCompareProduct',
    async () => Promise.all(listings.map((listing) => fetchProduct(listing.productId))),
    {
      enabled: !selectedListing.isLoading && listings.length !== 0,
      retry: false,
    }
  );

  const selectedCat = useQuery(
    'getCompareCat',
    async () => Promise.all(products.map((category) => fetchCatById(category.categoryId))),
    {
      enabled: !selectedProduct.isLoading && products.length !== 0,
      retry: false,
    }
  );

  useEffect(() => {
    if (selectedListing.data !== undefined) {
      setListings(selectedListing.data);
    }
    if (selectedProduct.data !== undefined) {
      setProducts(selectedProduct.data);
    }
    if (selectedCat.data !== undefined) {
      setCategory(selectedCat.data);
    }
  }, [selectedListing.data, selectedProduct.data, selectedCat.data]);

  useEffect(() => {
    if (listings !== undefined) {
      const existingParams = Object.keys(parameters);
      const paramIds = new Set<string>();

      listings.forEach((listing) => {
        listing.parameters?.forEach(({ paramId }) => {
          const stringParamId = paramId.toString();
          if (existingParams.indexOf(stringParamId) === -1) paramIds.add(stringParamId);
        });
      });

      if (paramIds.size !== 0) {
        setParamIdsToFetch([...paramIds]);
      }
    }
  }, [listings]);

  useEffect(() => {
    if (params !== undefined && params.length !== 0) {
      addParams(params);
    }
  }, [params, paramIdsToFetch]);

  const queries = [selectedListing, selectedProduct, selectedCat];
  const isError = queries.some((query) => query.isError);
  const statuses = queries.map((query) => (query.error as AxiosError)?.status);

  // ** Error Handling
  useEffect(() => {
    if (isError) {
      if (statuses.includes(404) || statuses.includes(422)) {
        router.replace('/404');
        return;
      }

      router.replace('/500');
      return;
    }

    if (
      selectedListing === undefined ||
      selectedProduct === undefined ||
      selectedCat === undefined
    ) {
      router.replace('/500');
    }
  }, [queries, isError, statuses]);

  const tableData: TableData = {
    sideHeaders: [
      'Price ($)',
      'Stock',
      'Description',
      'Category',
      'Negotiable',
      'Cross Section Image',
      'Type',
      'Company',
      'Parameters',
    ],
    rows: [
      {
        id: 'row2',
        data:
          listings.length !== 0 && products.length !== 0
            ? listings.map((listing, index) => `$ ${listing.price} / ${products[index].unit}`)
            : [],
      },
      {
        id: 'row3',
        data:
          listings.length !== 0 && products.length !== 0
            ? listings.map((listing, index) => `${listing.quantity} ${products[index].unit}`)
            : [],
      },
      {
        id: 'row4',
        data: products.map((product) => product.description),
      },
      { id: 'row5', data: category.map((cat) => cat.name) },
      { id: 'row6', data: listings.map((listing) => (listing.negotiable ? 'Yes' : 'No')) },
      {
        id: 'row7',
        data: category.map((cat) => <S3BoxImageCell key={cat.id} image={cat.image} />),
      },
      { id: 'row8', data: listings.map((listing) => listing.type) },
      { id: 'row9', data: listings.map((listing) => listing.owner.company.name) },
      {
        id: 'row10',
        data: listings.map((listing) => (
          <Grid container spacing={2} ml={3}>
            {listing.parameters &&
              params &&
              params.length !== 0 &&
              listing.parameters.map(({ paramId, value }) => {
                const data = params.find((param) => param.id === paramId);

                if (data === undefined) return null;

                const { displayName, type } = data;
                console.log('paramId:', paramId);
                console.log('displayName:', displayName);
                console.log('value:', value);
                console.log('type:', type);

                let unit = '';

                if (type === 'WEIGHT') {
                  unit = ' kg';
                } else if (type === 'DIMENSION') {
                  if (displayName === 'Length') {
                    unit = ' m';
                  } else {
                    unit = ' mm';
                  }
                }

                console.log('unit:', unit);

                return (
                  <Grid item xl={3} lg={3} md={3} sm={2} xs={2} direction="row" key={paramId}>
                    <Box>
                      <Typography sx={{ fontWeight: 'bold', mb: 1 }}>{displayName}</Typography>
                      <Typography>{`${value}${unit}`}</Typography>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        )),
      },
    ],
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key Specs</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>{product.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.sideHeaders.map((header) => (
            <TableRow key={header}>
              <TableCell>{header}</TableCell>
              {tableData.rows
                .find((row) => row.id === `row${tableData.sideHeaders.indexOf(header) + 2}`)
                ?.data.map((cellData) =>
                  header === 'Cross Section Image' ? (
                    <TableCell key={`cell-${header}`}>{cellData}</TableCell>
                  ) : (
                    <TableCell key={`cell-${header}`}>{cellData}</TableCell>
                  )
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompareDifferences;
