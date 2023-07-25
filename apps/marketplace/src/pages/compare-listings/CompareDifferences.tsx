import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import fetchListing from '@/middlewares/fetchListing';
import fetchCatById from '@/middlewares/fetchCatById';
import { Listing } from '@/utils/api/client/zod/listings';
import { Category } from '@/utils/api/client/zod/categories';
import S3BoxImage from '@/components/S3BoxImage';

interface TableRowData {
  id: string;
  data: (string | JSX.Element)[];
}


interface TableData {
  sideHeaders: string[];
  rows: TableRowData[];
}

interface CompareDifferencesProps {
  productIds: string[];
}

const CompareDifferences = ({ productIds }: CompareDifferencesProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [category, setCategory] = useState<Category[]>([]);

  console.log('Product IDs:', productIds);
  useEffect(() => {
    const fetchListings = async () => {
      const listings = await Promise.all(productIds.map((id) => fetchListing(id)));
      const categories = await Promise.all(
        listings.map((listing) => fetchCatById(listing.categoryId))
      );
      setCategory(categories);
      setListings(listings);
    };
    fetchListings();
  }, [productIds]);
  console.log('Listings:', listings);
  console.log('Category:', category);

  const tableData: TableData = {
    sideHeaders: [
      'Dimensions',
      'Price ($)',
      'Stock',
      'Condition',
      'Category',
      'Negotiable',
      'Cross Section Image',
      'Type',
      'Company',
    ],
    rows: [
      {
        id: 'row1',
        data: listings.map((listing) =>
          listing.parameters
            ? `Length: ${
                listing.parameters.find((param) => param.paramId === '2')?.value
              }, Width: ${
                listing.parameters.find((param) => param.paramId === '4')?.value
              }, Height: ${listing.parameters.find((param) => param.paramId === '21')?.value}`
            : ''
        ),
      },
      { id: 'row2', data: listings.map((listing) => `$ ${listing.price} / ${listing.unit}`) },
      { id: 'row3', data: listings.map((listing) => `${listing.quantity}`) },
      { id: 'row4', data: listings.map((listing) => listing.description) },
      { id: 'row5', data: category.map((cat) => cat.name) },
      { id: 'row6', data: listings.map((listing) => (listing.negotiable ? 'Yes' : 'No')) },
      {
        id: 'row8',
        data: category.map((cat) => (
          <S3BoxImage
            sx={{
              height: { xs: 50, sm: 75, md: 100, lg:   125 },
              display: 'block',
              width: { xs: 0, sm: 150, md: 200, lg: 250 },
              overflow: 'hidden',
              opacity: '30%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            src={cat.image}
          />
        )),
      },
      { id: 'row9', data: listings.map((listing) => listing.type) },
      { id: 'row10', data: listings.map((listing) => listing.owner.company.name) },
    ],
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key Specs</TableCell>
            {listings.map((listing, index) => (
              <TableCell key={index}>{listing.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      <TableBody>
  {tableData.sideHeaders.map((header, index) => (
    <TableRow key={header}>
      <TableCell>{header}</TableCell>
      {tableData.rows[index]?.data.map((cellData, cellIndex) =>
        header === 'Cross Section Image' ? (
          <TableCell key={`cell-${index}-${cellIndex}`}>{cellData}</TableCell>
        ) : (
          <TableCell key={`cell-${index}-${cellIndex}`}>{cellData}</TableCell>
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
