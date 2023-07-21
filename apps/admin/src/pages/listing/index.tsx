// import React, { useState } from 'react';
// import { Box, useMediaQuery, useTheme, Button, TextField, InputLabel } from '@mui/material';
// import Link from 'next/link';
// import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
// import { Header } from '@/components/tables/BaseTable/BaseTableHead';

// const AdvertisementUpload = () => {
//   const theme = useTheme();
//   const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

//   function createData(
//     name: string,
//     nameChinese: string,
//     description: string,
//     category: string,
//     unit: string,
//     unitChinese: string
//   ): BaseTableData {
//     return {
//       id: name,
//       name,
//       nameChinese,
//       description,
//       category,
//       unit,
//       unitChinese,
//     };
//   }

//   const headCells: Header[] = [
//     {
//       key: 'name',
//       label: 'Listing Name',
//     },
//     {
//       key: 'nameChinese',
//       label: 'Listing Name (Chinese)',
//     },
//     {
//       key: 'description',
//       label: 'Description',
//     },
//     {
//       key: 'category',
//       label: 'Category',
//     },
//     {
//       key: 'unit',
//       label: 'Unit',
//     },
//     {
//       key: 'unitChinese',
//       label: 'Unit (Chinese)',
//     },
//   ];

//   const rows = [
//     createData(
//       'Iron Beams Metal',
//       '梁金属',
//       'The beams are in good condition',
//       'Beams',
//       'Kg',
//       '公斤'
//     ),
//     createData(
//       'Iron Hollow Section',
//       '铁梁金属',
//       'The hollow section are in good condition',
//       'Hollow Section',
//       'Kg',
//       '公斤'
//     ),
//     createData(
//       'Steel Angles',
//       '铁角钢',
//       'The angles are in good condition',
//       'Angles',
//       'Kg',
//       '公斤'
//     ),
//     createData(
//       'S232 Sheet Piles',
//       'S232 钢板柱',
//       'The sheet piles are in good condition',
//       'Sheet Piles',
//       'Kg',
//       '公斤'
//     ),
//     createData(
//       'S233 Sheet Piles',
//       'S233 钢板柱',
//       'The sheet piles are in good condition',
//       'Sheet Piles',
//       'Kg',
//       '公斤'
//     ),
//     createData(
//       'Iron Metal Channels',
//       '梁金属',
//       'The channels are in good condition',
//       'Channels',
//       'Kg',
//       '公斤'
//     ),
//   ];

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box
//       sx={{
//         mt: '10px',
//       }}
//     >
//       <Box>
//         <Link href="/create-listing" passHref>
//           <Button
//             variant="contained"
//             sx={{ mt: '20px', mr: '30px', ml: '20px', fontSize: '10px', fontWeight: 'bold' }}
//           >
//             CREATE LISTING NAME
//           </Button>
//         </Link>

//         <TextField
//           label="Search Listings..."
//           variant="standard"
//           sx={{
//             width: '200px',
//             height: '40px',
//             mb: '20px',
//             fontSize: '10px',
//           }}
//         >
//           Search Listings ...
//         </TextField>
//       </Box>

//       <Box
//         sx={{
//           backgroundColor: 'transparent',
//           mt: '20px',
//           mr: '20px',
//           ml: '20px',
//         }}
//       >
//         <BaseTable
//           heading="Listing items"
//           rows={rows}
//           headers={headCells}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           onDelete={() => console.log('delete')}
//           onEdit={() => console.log('edit')}
//           onToggle={() => console.log('toggle')}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           rowsPerPageOptions={[5, 10, 25]}
//           totalCount={rows.length}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default AdvertisementUpload;

import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Button, Container, Box } from '@mui/material/';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchListing from '@/middlewares/fetchListing';
import { error } from 'console';

function createData(
  name: string,
  description: string,
  category: string,
  unit: string
): BaseTableData {
  return {
    id: name,
    name,
    description,
    category,
    unit,
  };
}

const headCells: Header[] = [
  {
    key: 'name',
    label: 'Listing Name',
  },
  {
    key: 'nameChinese',
    label: 'Listing Name (Chinese)',
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'category',
    label: 'Category',
  },
  {
    key: 'unit',
    label: 'Unit',
  },
  {
    key: 'unitChinese',
    label: 'Unit (Chinese)',
  },
];

const useListingPageQuery = () => {
  const { data } = useQuery('listing', async () => fetchListing());

  return data;
};

const ListingTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const listings = useListingPageQuery();
  console.log('listings: ', listings);

  const router = useRouter();

  const sortRows = (): void => {
    const rowsData: BaseTableData[] = [];

    listings?.forEach((item) => {
      rowsData.push(createData(item.name, item.description, item.categoryId, item.unit));
    });

    setRows(rowsData);
  };

  const handleEdit = (row: BaseTableData) => {
    const { id } = row;
    const editUrl = `/edit-category/${id}`;
    router.push(editUrl);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  useEffect(() => {
    sortRows();
  }, [listings]);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const pageRows = rows.slice(startIndex, endIndex);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Box sx={{ width: '100%' }}>
          <Link href="/listing/create-listing" passHref>
            <Button variant="contained" sx={{ mb: '20px', fontSize: '12px', fontWeight: 'bold' }}>
              CREATE LISTING NAME
            </Button>
          </Link>

          <BaseTable
            heading="Categories"
            rows={pageRows}
            headers={headCells}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onDelete={() => console.log('delete')}
            onEdit={handleEdit}
            onToggle={() => console.log('toggle')}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            totalCount={rows.length}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ListingTable;
