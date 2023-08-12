import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import fetchListing from '@/services/fetchListing';
import fetchCatById from '@/services/fetchCatById';
import fetchProduct from '@/services/fetchProduct';
import { Listing } from '@/utils/api/client/zod/listings';
import { Category } from '@/utils/api/client/zod/categories';
import { Product } from '@/utils/api/client/zod/products';
import S3BoxImage from '@/components/S3BoxImage';
import { useQuery } from 'react-query';

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

  const selectedListing = useQuery(
    'getCompareListing',
    async () => Promise.all(listingIds.map((id) => fetchListing(id))),
    {
      enabled: listingIds !== undefined,
    }
  );

  const selectedProduct = useQuery(
    'getCompareProduct',
    async () => Promise.all(listings.map((listing) => fetchProduct(listing.productId))),
    {
      enabled: !selectedListing.isLoading && listings.length !== 0,
    }
  );

  const selectedCat = useQuery(
    'getCompareCat',
    async () => Promise.all(products.map((category) => fetchCatById(category.categoryId))),
    {
      enabled: !selectedProduct.isLoading && products.length !== 0,
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
