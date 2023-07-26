import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import fetchCategories from '@/middlewares/fetchCategories';
import { CategoryResponseBody } from '@/utils/api/client/zod';
import Spinner from '@/components/fallbacks/Spinner';
import deleteCategories from '@/middlewares/deleteCategory';

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
  // {
  //   key: 'name',
  //   label: 'Category Name (Chinese)',
  // },
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
  return { data, error, isError, isFetched };
};

const CategoryTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);

  const category = useCategoryPageQuery();

  const router = useRouter();
  const queryClient = useQueryClient();

  const sortRows = (): void => {
    const rowsData: BaseTableData[] = [];

    category.data?.forEach((item) => {
      rowsData.push(createData(item.id, item.name, item.active));
    });

    setRows(rowsData);
  };

  const onEdit = (row: BaseTableData) => {
    window.location.href = `/category/${row.id}/edit-category`;
  };

  // const handleDelete = async (rowsToDelete: readonly BaseTableData[]): Promise<void> => {
  //   const idsToDelete = rowsToDelete.map((row) => row.id);

  //   try {
  //     await Promise.all(idsToDelete.map((id) => deleteCategories(id)));

  //     setRows((prevRows) => prevRows.filter((row) => !idsToDelete.includes(row.id)));
  //   } catch (error) {
  //     console.error('Error deleting categories:', error);
  //   }
  // };

  const handleDelete = (rowsToDelete: readonly BaseTableData[]): BaseTableData[] => {
    const idsToDelete = rowsToDelete.map((row) => row.id);

    try {
      Promise.all(idsToDelete.map((id) => deleteCategories(id)));

      setRows((prevRows) => prevRows.filter((row) => !idsToDelete.includes(row.id)));

      return [];
    } catch (error) {
      console.error('Error deleting categories:', error);
      return [];
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleCreateCategory = () => {
    window.location.href = `/category/create-category`;
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  useEffect(() => {
    sortRows();
  }, [category]);

  useEffect(() => {
    if (isDeleted) {
      queryClient.invalidateQueries('cat');
      setIsDeleted(false);
    }
  }, [isDeleted, queryClient]);

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

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const pageRows = rows.slice(startIndex, endIndex);

  return (
    <Box sx={{ m: 4, alignItems: 'center' }}>
      <BaseTable
        sx={{
          height: '100%',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}
        customHeader={
          <Box sx={{ padding: 2, display: 'flex' }}>
            <Box>
              <Typography variant="h5">Categories</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
              <Button
                variant="contained"
                sx={({ palette, spacing }) => ({
                  bgcolor: palette.primary[400],
                  mb: spacing(1),
                  mr: spacing(1),
                  width: { xs: '60%', sm: '100%', md: '100%', lg: '100%' },
                })}
                onClick={handleCreateCategory}
              >
                Create Category
              </Button>
            </Box>
          </Box>
        }
        heading=""
        rows={pageRows}
        headers={headCells}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onDelete={handleDelete}
        onEdit={onEdit}
        onToggle={() => console.log('toggle')}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={rows.length}
      />
    </Box>
  );
};

export default CategoryTable;
