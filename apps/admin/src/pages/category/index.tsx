import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchCategories from '@/middlewares/fetchCategories';
import { CategoryResponseBody } from '@/utils/api/client/zod';
import { useResponsiveness } from '@inc/ui';

export type CategoryProps = {
  data: CategoryResponseBody[];
};

export type CategoryTableProps = {
  data: CategoryResponseBody[];
};

function createData(id: string, name: string, active: boolean): BaseTableData {
  return {
    id,
    name,
    active,
  };
}

const headCells: Header[] = [
  {
    key: 'name',
    label: 'Category Name',
  },
  {
    key: 'name',
    label: 'Category Name (Chinese)',
  },
  {
    key: 'active',
    label: 'Status',
    replace: {
      true: 'Active',
      false: 'Inactive',
    },
  },
];

const useCategoryPageQuery = () => {
  const { data } = useQuery('cat', async () => fetchCategories());
  return data;
};

const CategoryTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const category = useCategoryPageQuery();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const router = useRouter();

  let tableWidth = '90%';
  if (isSm) { 
    tableWidth = '100%';
  } else if (isMd) {
    tableWidth = '80%';
  } else if (isLg) {
    tableWidth = '80%';
  } else {
    tableWidth = '90%';
  }

  const sortRows = (): void => {
    const rowsData: BaseTableData[] = [];

    category?.forEach((item) => {
      rowsData.push(createData(item.id, item.name, item.active));
    });

    setRows(rowsData);
  };

  const handleEdit = (row: BaseTableData) => {
    const { id } = row;
    const editUrl = `category/${id}/edit-category`;
    router.push(editUrl);
  };

  const handleDelete = (rowsToDelete: readonly BaseTableData[]): BaseTableData[] => {
    const idsToDelete = rowsToDelete.map((row) => row.id);
    const newRows = rows.filter((item) => !idsToDelete.includes(item.id));
    setRows(newRows);
    return newRows; // Return the new rows after deletion
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
  }, [category]);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const pageRows = rows.slice(startIndex, endIndex);

  return (
    <Container>
      <Box sx={{ mt: 3, alignItems: 'center' }}>
        {/* <Box sx={{ width: '90%' }}> */}
        <Box>
          <BaseTable
            heading="Categories"
            rows={pageRows}
            headers={headCells}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onDelete={handleDelete}
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

export default CategoryTable;
