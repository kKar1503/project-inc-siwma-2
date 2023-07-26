import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import fetchCategories from '@/middlewares/fetchCategories';
import { CategoryResponseBody } from '@/utils/api/client/zod';
import Spinner from '@/components/fallbacks/Spinner';

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
  const { data, error, isError, isFetched } = useQuery('cat', async () => fetchCategories());
  return {data, error, isError, isFetched};
};

const CategoryTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const category = useCategoryPageQuery();

  const router = useRouter();

  useEffect(() => {
    if (!category.isFetched) {
      return;
    }

    if (category.isError) {
      if ('status' in (category.error as any) && (category.error as any).status === 404) {
        router.replace('/404');
        return;
      }

      router.replace('/500');
      return;
    }

    if (category === undefined) {
      router.replace('/500');
    }
  }, [category.isFetched]);

  if (!category.isFetched) {
    return <Spinner />;
  }

  const sortRows = (): void => {
    const rowsData: BaseTableData[] = [];

    category.data?.forEach((item) => {
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
    return newRows;
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
